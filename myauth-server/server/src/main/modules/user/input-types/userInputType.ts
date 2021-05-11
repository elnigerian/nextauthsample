import {Field, InputType} from "type-graphql";
import {User} from "../../../entity/user";
import {Column} from "typeorm";
import {IsBoolean, IsEmail, IsString} from "class-validator";

@InputType()
export class UserInputType implements Partial<User> {

    @Field()
    @IsEmail()
    emailAddress: string | undefined;

    @Field({nullable: true})
    @Column()
    password?: string;

    @Field({nullable: true})
    @IsString()
    userType?: string;

    @Field({defaultValue: true, nullable: true})
    @IsBoolean()
    requirePwdChange?: boolean;

    @Field({nullable: true})
    @IsString()
    passwordHint?: string;
}
