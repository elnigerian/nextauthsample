import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {BaseAuthEntity} from "./baseAuthEntity";

@ObjectType()
@Entity({name: 'accounts'})
export class Account extends BaseAuthEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    accountId!: string;

    @Field()
    @Column({default: 'account'})
    object: string;

    @Field()
    @Index('compound_id')
    @Column('text', {name: 'compound_id'})
    compoundID: string;

    @Index('userId')
    @Column({type: 'text'})
    userId: string;

    @Field()
    @Column({type: 'text'})
    providerType: string;

    @Field()
    @Index('provider_id')
    @Column({type: 'text', name: 'provider_id'})
    providerID: string;

    @Field()
    @Index('provider_account_id')
    @Column({type: 'text', name: 'provider_account_id'})
    providerAccountID: string;


    @Field()
    @Column({type: 'text'})
    refreshToken: string;


    @Field()
    @Column({type: 'text'})
    accessToken: string;

    @Field()
    @Column({type: 'timestamp'})
    accessTokenExpires: Date;
}
