import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    AuthModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
