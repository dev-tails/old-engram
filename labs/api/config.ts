import dotenv from 'dotenv';

dotenv.config();

export const config = {
  files: {
    uploadPath: process.env.FILES_UPLOAD_PATH
  }
}