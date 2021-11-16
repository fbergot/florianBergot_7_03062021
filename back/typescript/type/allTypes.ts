import { SignOptions, Secret, GetPublicKeyOrSecret, VerifyOptions, Jwt } from 'jsonwebtoken';

type MethodsModel = {
	create<T>(data: any): Promise<T>;
	findOne<T>(filter: {}): Promise<T | null>;
	findAll<T>(filter: {}): Promise<T[] | null >;
	destroy<T>(): Promise<T>;
	save<T>(): Promise<T>;
};
// ---------- /User types/ --------------

export type User = {
	readonly uuid: string;
	readonly id: number;
	email: string;
	password: string;
	username: string;
	isAdmin: boolean;
	businessRole: string;
	urlAvatar: string;
	updatedAt: string;
	createdAt: string;
} & MethodsModel;


// ---------- /Post types/ --------------

export type Post = {
	readonly id: number;
	readonly UserId: number;
	content: string;
	attachment: string;
	createdAt: string;
	updatedAt: string;
} & MethodsModel & {
	addCategory(data: any): Promise<any>;
	addReaction<T>(data: any): Promise<T>;
}

// ---------- /Category types/ -------------- 

export type Category = {
	readonly id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	Posts: any[];
} & MethodsModel & {
	findOrCreate<T>(data: any): Promise<T>;
}

// ---------- /Comment types/ --------------

export type Comment = {
	readonly id: number;
	content: string;
	UserId: number;
	PostId: number;
	createdAt: string;
	updatedAt: string;
} & MethodsModel;

export type CommentProperties = {
	content: Comment["content"];
	UserId: Comment["UserId"];
	PostId: Comment["PostId"];
};

// ---------- /Reaction types/ --------------

export type Reaction = {
	readonly id: number;
	userId: number;
	likeOrDislike: string;
	createdAt: string;
	updatedAt: string;
} & MethodsModel;

// ---------- / Middleware (multer-config) / --------------

export type File = {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
};

// ---------- / Messages (constructor UserController) / -------------- 

export type Messages = {
	badPass: string,
	userNotExist: string,
	alreadyUser: string,
	userDeleted: string,
	userNotDeleted: string,
	userNotFound: string,
	updatedSuccess: string,
	notUpdate: string,
	infoNotFound: string
}

// ---------- / JWT (class) / -------------- 

export type JWT = {
    sign(
        payload: { userUuid: string },
        secret: string,
        options: any,
		callback: (err: any, token: any) => void
	): string;
	
	verify(
		token: string,
		secret: Secret | GetPublicKeyOrSecret,
		options: VerifyOptions,
		callback: (err: any, decoded: any) => void
	): string | Jwt;
    
}