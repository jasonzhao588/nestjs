import { Controller, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @Post()
  @UseGuards(AuthGuard())
  async store(@Body() data: CategoryDto){
    return await this.categoryService.store(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(@Param('id') id: string, @Body() data: Partial<CategoryDto> ){
    return await this.categoryService.update(id,data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async destroy(@Param('id') id: string){
    return await this.categoryService.destroy(id);
  }
}
