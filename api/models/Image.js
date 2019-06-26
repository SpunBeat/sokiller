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
  app.route('/api/upload')
    .post(multer.single('file'), async (req, res, next) => {
      if (!req.file) {
        res.status(200).json({ message: 'no files' });
      }

      const gcsname = Date.now() + req.file.originalname;
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
        res.status(200).json({ message: 'ready' });
      });

      stream.end(req.file.buffer);
    })
}
