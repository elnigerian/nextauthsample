import {Field, ID, ObjectType} from "type-graphql";
import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";
import {BaseAuthEntity} from "./baseAuthEntity";

@ObjectType()
@Entity({name: 'verification_requests'})
export class VerificationRequests extends BaseAuthEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    VerificationRequestId!: string;

    @Field()
    @Column({default: 'verification_requests'})
    object: string;

    @Field()
    @Column('text', {nullable: false})
    identifier: string;

    @Field()
    @Index('token')
    @Column({type: 'text'})
    token: string;

    @Field()
    @Column({type: 'timestamp'})
    expires: Date;
}
