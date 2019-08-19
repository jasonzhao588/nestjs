import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from "typeorm";
import { create } from "istanbul-reports";
import { User } from "../user/user.entity";

@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  title: string ;

  @Column('longtext', { nullable:true})
  body: string;

  @CreateDateColumn()
  create: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User

  @ManyToMany(type => User, user => user.voted)
  liked: User[];
}