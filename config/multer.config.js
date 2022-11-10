const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/data/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(
      null,
      file.fieldname +
        '_' +
        uniqueSuffix +
        '.' +
        file.originalname.split(' ').join('').toLowerCase()
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File format should be PNG,JPG,JPEG'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
