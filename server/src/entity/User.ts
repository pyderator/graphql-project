import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Field({ nullable: true })
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;
}
