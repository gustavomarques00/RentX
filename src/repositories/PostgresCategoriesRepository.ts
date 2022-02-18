import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        throw new Error("Method not Implement.")
    }

    list(): Category[]{
        throw new Error("Method not Implement.")
    }

    create({name,description}: ICreateCategoryDTO): void {
        throw new Error("Method not Implement.")
    }

}

export {PostgresCategoriesRepository}