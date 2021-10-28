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
	findAll<T>(objOption: { include: {model: any}[] }): Promise<T>;
}

class CategoryController {

	categoryModel: CatModel;
	postModel: PostModel;

	constructor(categoryModel: CatModel, postModel: PostModel) {
		this.categoryModel = categoryModel;
		this.postModel = postModel;
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
	 * Get all categories with posts associated
	 * @memberof CategoryController
	 */
	public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categories = await this.categoryModel.findAll<CatModel>({
				include: [
					{
						model: this.postModel
					}
				]
			});
			res.status(200).json(categories);
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
  	}
}

const categoryController = new CategoryController(models.Category, models.Post);

export default categoryController;