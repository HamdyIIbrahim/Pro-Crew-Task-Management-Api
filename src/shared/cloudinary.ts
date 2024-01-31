import * as dotenv from 'dotenv';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request } from 'express';
const multer = require('multer');

dotenv.config();

interface MulterFile extends Express.Multer.File {}

const folder = 'ProCrew';

export const getPublicIds = (links: string[]): string[] => {
  return links.map((link) =>
    link.substring(link.indexOf(folder), link.lastIndexOf('.')),
  );
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const upload = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: MulterFile,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  },
});

export const uploadGeneratedAsset = async (
  file: any,
): Promise<UploadApiResponse> => {
  const result = await cloudinary.uploader.unsigned_upload(file, 'iqarkjsy', {
    resource_type: 'raw',
    folder: `${folder}/assets`,
  });
  return result;
};

export const setFetchFormatToAuto = (links: string[]): string[] => {
  const separator = 'upload/';
  const newLinks: string[] = [];
  links.forEach((link) => {
    const linkArray = link.split(separator);
    linkArray.splice(1, 0, separator, 'f_auto/');
    const newlink = linkArray.join('');
    newLinks.push(newlink);
  });

  return newLinks;
};
