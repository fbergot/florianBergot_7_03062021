import * as multer from 'multer';

const mimesTypes: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const options: multer.DiskStorageOptions = {
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // transform space in _
        const name = file.originalname.split(' ').join('_');
        let extension;
        let createNameWithExtension = '';

        if (file.mimetype in mimesTypes) {
            extension = mimesTypes[file.mimetype] ;
            createNameWithExtension = `${name}${Date.now()}.${extension}`;
            callback(null, createNameWithExtension);            
        }
        else {
           callback(new Error('Bad mimetype'), "");
       }       
    }
}
const storage = multer.diskStorage(options);

export default multer({ storage: storage }).single('image');