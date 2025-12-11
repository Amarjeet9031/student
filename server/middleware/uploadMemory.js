import multer from "multer";

const storage = multer.memoryStorage();  // IMPORTANT for Render

export default multer({ storage });
