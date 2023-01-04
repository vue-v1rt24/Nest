import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Category} from './models/category.model';
import {CreateCategoryDto} from './dto/create-category.dto';
import {PositionsService} from '../positions/positions.service';

import {FileType, FileLoad} from '../utils/fileUpload';

import {messageErrors} from '../utils/messageErrors';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category)
        private readonly categoryModel: typeof Category,
        private readonly positionsService: PositionsService,
    ) {
    }

    async getAllCategories(userId: string): Promise<Category[]> {
        try {
            return this.categoryModel.findAll({where: {user_id: +userId}});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getIdCategory(id: string): Promise<Category> {
        try {
            return await this.categoryModel.findOne({where: {id}});
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createCategory(dto: CreateCategoryDto, imageSrc?: object): Promise<Category> {
        try {
            const category = await this.categoryModel.create(dto);

            if (imageSrc) {
                const pathImg = FileLoad(FileType.IMAGES, imageSrc);
                await category.update({imageSrc: pathImg});
            }

            return category;
        } catch (error) {
            if (error.original?.errno === 1062) {
                messageErrors(400, 'Такое название категории уже существует', 'categoryExists');
            }

            if (error.message.indexOf('user_id') !== -1) {
                messageErrors(400, 'Нет id пользователя', 'categoryNotUserId');
            }
            throw error;
        }
    }

    async updateCategory(id: string, dto: object, imageSrc?: object): Promise<Category> {
        try {
            const category = await this.getIdCategory(id);

            if (!category) {
                throw new Error();
            }

            const categoryEl = await category.update(dto);

            if (imageSrc) {
                const pathImg = FileLoad(FileType.IMAGES, imageSrc);
                await categoryEl.update({imageSrc: pathImg});
            }

            return categoryEl;
        } catch (error) {
            if (error.original?.errno === 1062) {
                messageErrors(400, 'Такое название категории уже существует', 'categoryExists');
            }
            console.log(error);
            messageErrors(404, `Категория с id ${id} не найдена`, 'categoryNotFound');
        }
    }

    async getIdCategoryDelete(id: string): Promise<{ message: string }> {
        try {
            const category = await this.getIdCategory(id);

            if (!category) {
                throw new Error('Категория не найдена');
            }

            await category.destroy();

            return {
                message: 'Категория удалена',
            };
        } catch (error) {
            console.log(error);
            messageErrors(404, error.message, 'categoryNotFound');
        }
    }
}
