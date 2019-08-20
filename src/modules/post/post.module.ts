import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    AuthModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
