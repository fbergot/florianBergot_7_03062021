import { Request, Response, NextFunction } from 'express';
const models = require("../../models");

type CatModel = {
	id: number,
	name: string,
	createdAt: string,
	updatedAt: string
} & methodModel;

type PostModel = {
	id: number,
	content: string,
	userId: number,
	attachment?: string,
	createdAt: string,
	updatedAt: string,
}

type methodModel = {
	create<T>(data: unknown): Promise<T>;
	findAll<T>(objOption: { include: { model: any }[] } | {}): Promise<T>;
	findOne<T>(data: unknown): Promise<T>;
}

type CategoryPost = {
	id: number;
	PostId: number;
	CategoryId: number;
	createdAt: string;
	updatedAt: string
}

class CategoryController {

	categoryModel: CatModel;
	postModel: PostModel;
	categoryPostModel: CategoryPost;

	constructor(categoryModel: CatModel, postModel: PostModel, categoryPostModel: CategoryPost ) {
		this.categoryModel = categoryModel;
		this.postModel = postModel;
		this.categoryPostModel = categoryPostModel;
	}
	/**
	 * Create one category
	 * @memberof CategoryController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newCategory = await this.categoryModel.create<CatModel>({
				name: req.body.name
			});
			res.status(201).json(newCategory);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}

	/**
	 * Get all categories
	 * @memberof CategoryController
	 */
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categories = await this.categoryModel.findAll<CatModel>({});
			res.status(200).json(categories);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
	
	/**
	 * Get all posts in category
	 * @memberof CategoryController
	 */
	public async getPostsInCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categoryWithPost = await this.categoryModel.findOne({
				where: { id: req.params.categoryId },
				include: [
					{
						model: this.postModel
					}
				]
			});
			res.status(200).json(categoryWithPost);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const categoryController = new CategoryController(models.Category, models.Post, models.CategoryPost);

export default categoryController;