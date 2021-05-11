import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {BaseAuthEntity} from "./baseAuthEntity";

@ObjectType()
@Entity({name: 'sessions'})
export class Session extends BaseAuthEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    accountId!: string;

    @Field()
    @Column({default: 'session'})
    object: string;


    @Field()
    @Index('session_token')
    @Column({type: 'text', name: 'session_token', nullable: false})
    sessionToken: string;


    @Field()
    @Index('access_token')
    @Column({type: 'text', name: 'access_token', nullable: false})
    accessToken: string;

    @Field()
    @Column({type: 'timestamp'})
    expires: Date;
}
