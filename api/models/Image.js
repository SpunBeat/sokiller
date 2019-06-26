const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const CLOUD_BUCKET = 'sokiller-bucket'

const storage = new Storage({
  keyFilename: './key.json',
  projectId: 'fierro-viejo',
});

const bucket = storage.bucket(CLOUD_BUCKET)

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

module.exports = app => {
  app.route('/api/admin/products/upload')
    .post(multer.single('file'), async (req, res, next) => {
      if (!req.file) {
        res.status(200).json({ message: 'no files' });
      }

      const filename = req.file.originalname
      let str = filename.split('.').slice(0, -1).join('.')
      const extension = filename.substr(filename.lastIndexOf('.') + 1)

      str = str.replace(/\W+(?!$)/g, '-').toLowerCase();
      str = str.replace(/\W$/, '').toLowerCase();

      const gcsname = Date.now() + '--' + str + '.' + extension;
      const file = bucket.file(gcsname);

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });

      stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        res.status(400).json({ err });
      });

      stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        res.status(200).json({ customSrc: req.file.cloudStoragePublicUrl });
      });

      stream.end(req.file.buffer);
    })
}
