import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){ }

  async store(data: UserDto) {
    const { name } = data;
    const user = await this.userRepository.findOne({ name });
    if (user) {
      throw new BadRequestException('用户名已经存在');
    }


    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }

  async show(id: string) {
    const entity = await this.userRepository.findOne(id,{
      relations: ['posts']
    });
    if (!entity) {
      throw new NotFoundException('没找到用户！');
    }
    return entity;
  }

  async updatePassword(id: string, data: UpdatePasswordDto){
    const { password, newPassword } = data;
    const entity = await this.userRepository.findOne(id);

    if (!entity) {
      throw new NotFoundException('未找到用户！');
    }

    const pass = await entity.comparePassword(password);

    if (!pass) {
      throw new BadRequestException(`密码验证失败，请重新输入！${newPassword}`)
    }

    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async destroy(id:string){
    const entity = await this.userRepository.delete(id);
    return entity;
  }

  async findByName(name: string, password?: boolean) {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user');
    queryBuilder.where('user.name = :name', { name });

    if (password) {
      queryBuilder.addSelect('user.password')
    }
    const entity = queryBuilder.getOne();
    return entity;
    // return await this.userRepository.findOne({ name })
  }

  async liked(id: number) {
    return this.userRepository
      .findOne(id, { relations: ['voted', 'voted.user'] });
  }
}
