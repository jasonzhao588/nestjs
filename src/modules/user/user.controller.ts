import { Controller, Post, Body, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }

  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(@Param('id') id: string , @Body() data: UpdatePasswordDto ){
    return await this.userService.updatePassword(id,data);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string){
    return await this.userService.destroy(id);
  }
}
