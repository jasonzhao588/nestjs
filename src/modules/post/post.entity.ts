import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { create } from "istanbul-reports";

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
}