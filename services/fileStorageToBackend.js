const multer = require("multer");
const path = require('path');

exports.fileStorage = (filepath) => {
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
          cb(null,filepath);
        }, 
        filename:(req, file, cb) => {
          cb(
            null,
            file.originalname + "-" + Date.now() + path.extname(file.originalname)
          );
        },
      });
      
    const upload = multer({
        storage: storage,
    })
    return upload    
}


  