import { Request } from 'express';
import type { File } from '../type/allTypes';
import * as multer from 'multer';
import * as dotenv from 'dotenv';

dotenv.config();

const mimesTypes: any = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

/**
 * Create multer options object
 */
const buildOptions = (destination: string) => {
    return {
		destination: (req: Request, file: File, callback: (p: Error | null, p2: string) => any) => {
			callback(null, destination);
		},
		filename: (req: Request, file: File, callback: (p: Error | null, p2: string) => any) => {
			// transform space in _
			const name = file.originalname.split(' ').join('_');
			let extension;
			let createNameWithExtension = '';
			// check mimesTypes
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
}

const destUserAvatars = process.env.DEST_USERS_IMAGES ?? "avatars_images";
const destPostsAttachments = process.env.DEST_POSTS_ATTACHMENTS ?? "posts_attachments";

const storageAvatar = multer.diskStorage(buildOptions(destUserAvatars));
const storagePost = multer.diskStorage(buildOptions(destPostsAttachments));

export const avatarMulter = multer({ storage: storageAvatar }).single('image');
export const postMulter = multer({ storage: storagePost }).single('image');