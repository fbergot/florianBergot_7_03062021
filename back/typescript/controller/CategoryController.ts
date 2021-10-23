import { Request, Response, NextFunction } from 'express';
const models = require("../../models");

type CatModel = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
} & methodModel;

type methodModel = {
    create<T>(data: unknown): Promise<T>
}

class CategoryController {

    categoryModel: CatModel;

    constructor(categoryModel: CatModel) {
        this.categoryModel = categoryModel;
    }
    /**
     * Create one category
     * @memberof CategoryController
     */
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newCategory = await this.categoryModel.create<CatModel>({ name: req.body.name });
            res.status(201).json(newCategory);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

const categoryController = new CategoryController(models.Category);

export default categoryController;