import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {BaseAuthEntity} from "./baseAuthEntity";

@ObjectType()
@Entity({name: 'users'})
export class User extends BaseAuthEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    userId!: string;

    @Field()
    @Column({default: 'user'})
    object: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Index('emailAddress')
    @Column('text', {unique: true})
    emailAddress: string;

    @Field()
    @Column('text')
    image: string;

    @Column()
    password: string;

    @Field()
    @Column('bool', {default: false})
    enabled: boolean;

    @Column('int', {default: 0})
    tokenVersion: number;

    @Field()
    @Column({type: 'timestamp', nullable: true})
    email_verified: Date;
}
