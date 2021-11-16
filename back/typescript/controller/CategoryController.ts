import { Request, Response, NextFunction } from 'express';
import type { User, Post, Category, } from '../type/allTypes';
// import commonJS: in JS (sequelize models) (TS in allow JS)
const models = require("../../models");

class CategoryController {

	private categoryModel: Category;
	private postModel: Post;
	private userModel: User;
	private message: {
		notPost: string
	};

	constructor(categoryModel: Category, postModel: Post, userModel: User) {
		this.categoryModel = categoryModel;
		this.postModel = postModel;
		this.userModel = userModel;
		this.message = {
			notPost: "Zero post in this category"
		}
	}
	/**
	 * Create one category
	 * @memberof CategoryController
	 */
	public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const newCategory = await this.categoryModel.create<Category>({
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
			const categories = await this.categoryModel.findAll<Category>({});
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
			const categoryWithPost = await this.categoryModel.findOne<Category>({
				where: { id: req.params.categoryId },
				include: [
					{
						model: this.postModel,
						order: 
							["id", "DESC"]
						,
						include: [
							{
								model: this.userModel,
								attributes: ['username']
							},
							{
								model: this.categoryModel,
								attributes: ['name']
							},

						]
					}
				]
			});
			if (categoryWithPost) {				
				res.status(200).json([...categoryWithPost.Posts]);
			} else {
				res.status(200).json({ message: this.message.notPost, posts: [] });
			}
		} catch (err: any) {
			res.status(500).json({ error: err.message });
		}
	}
}

const categoryController = new CategoryController(models.Category, models.Post, models.User);

export default categoryController;