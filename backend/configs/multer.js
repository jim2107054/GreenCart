import multer from 'multer';

// Set up storage engine
const storage = multer.diskStorage({});

const upload = multer({ storage: storage });

export default upload;
