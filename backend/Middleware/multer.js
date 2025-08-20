// const multer=require("multer");
// const path=require("path")
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null,path.join(__dirname, '..', 'uploads'))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const backpart="."+file.originalname.split(".")[1]
//     cb(null, file.fieldname + '-' + uniqueSuffix+backpart)
//   }
// })

// const upload = multer({ storage: storage })
// module.exports=upload;

const multer = require("multer");

// Store files in memory instead of writing to disk
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
