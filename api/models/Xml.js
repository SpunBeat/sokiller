const xmlToJson = require('xml-to-json-stream')
const parser = xmlToJson({ attributeMode: true })
const { Storage } = require('@google-cloud/storage')
const Multer = require('multer')
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
})
const CLOUD_BUCKET = 'sokiller-bucket'
const storage = new Storage({ keyFilename: './key.json', projectId: 'fierro-viejo', })
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = CLOUD_BUCKET => filename => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}
const getPublicFromBucket = getPublicUrl(CLOUD_BUCKET)

const getName = filename => {
  let str = filename.split('.').slice(0, -1).join('.')
  const extension = filename.substr(filename.lastIndexOf('.') + 1)
  str = str.replace(/\W+(?!$)/g, '-').toLowerCase()
  str = str.replace(/\W$/, '').toLowerCase()
  const gcsname = Date.now() + '--' + str + '.' + extension
  return { gcsname }
}

const asyncParse = async xml => {
  return new Promise((resolve, reject) => {
    parser.xmlToJson(xml, (err, json) => {
      if (err) {
        reject(err)
      }
      resolve(json)
    })
  })
}

const gcloudManage = async (req, res) => {
  if (!req.file) {
    res.status(200).json({ message: 'no files' });
  }
  const { gcsname } = getName(req.file.originalname)
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: { contentType: req.file.mimetype }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    res.status(400).json({ err })
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    req.file.cloudStoragePublicUrl = getPublicFromBucket(gcsname)
    try {
      const archivo = bucket.file(gcsname).createReadStream()
      let buf = ''
      archivo
        .on('data', d => {
          buf += d;
        })
        .on('end', async () => {
          const response = await asyncParse(buf)
          const total = response['cfdi:Comprobante']['Total']
          res.status(200).json({ customSrc: req.file.cloudStoragePublicUrl, total })
        })
    } catch (error) {
      console.log(error)
    }
  })

  stream.end(req.file.buffer)
}



module.exports = app => {
  app.route('/api/admin/xml/upload').post(multer.single('file'), gcloudManage)
}
