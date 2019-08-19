import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async store(data: CategoryDto){
    const entity = await this.categoryRepository.create(data);
    return await this.categoryRepository.save(entity);
  }

  async update(id:string, data: Partial<Category>){
    const result = await this.categoryRepository.update(id,data);
    return result;
  }

  async destroy(id:string){
    const result = await this.categoryRepository.delete(id);
    return result;
  }
}
