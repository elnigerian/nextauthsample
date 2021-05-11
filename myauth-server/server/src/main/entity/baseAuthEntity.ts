import {BaseEntity, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {Field} from "type-graphql";

/**
 * The base entity upon which all entities inherit from.
 */

export class BaseAuthEntity extends BaseEntity {
    @Field()
    @Column({nullable: true})
    disabledDate: string;

    @Field()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fromDate: Date;

    @Field()
    @Column({type: 'timestamp', nullable: true})
    thruDate: Date;

    @Field()
    @CreateDateColumn({name: 'created_at'})
    createdDate: Date;

    @Field()
    @UpdateDateColumn({name: 'updated_at'})
    lastUpdatedDate: Date;
}
