import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2"

@InputType()
class UsernamePasswordInput{
    @Field()
    username:string;
    @Field()
    password:string;
}

@ObjectType()
class FieldError {
  @Field()
  field:string;

  @Field()
  message:string;
} 

@ObjectType()
class UserResponse {
   @Field(()=>[FieldError], { nullable:true })
   errors?:FieldError[];

   @Field(()=>User, { nullable:true })
   user?:User;
} 

@Resolver()
export class UserResolvers {
  @Mutation(()=>UserResponse)
  async register(@Arg('options') options:UsernamePasswordInput,@Ctx(){em}:MyContext):Promise<UserResponse>{

    if(options.username.length <= 2){
      return {
        errors:[
          {
          field:'username',
          message:'Length must be greater than 2'
          },
      ]
      }
    }
    if(options.password.length <= 5){
      return {
        errors:[
          {
          field:'Password',
          message:'Password must be greater than 5 chracter'
          },
      ]
      }
    }
      const hashedPassword = await argon2.hash(options.password);
      const user = em.create(User,{
        username:options.username,
        password:hashedPassword
      });
      
       await em.persistAndFlush(user);
      
      return {
         user
      };
  }


  @Mutation( ()=> UserResponse)
  async login(
    @Arg('options') options:UsernamePasswordInput,
    @Ctx(){em}:MyContext
    ): Promise<UserResponse> { 
      const user = await em.findOne(User,{username:options.username});
      if(!user){
        return {
          errors:[
            {
            field:'username',
            message:'That username does not exit'
            },
        ]
        }
      }

      const valid =await argon2.verify(user.password,options.password);
      if(!valid){
        return {
          errors:[
            {
            field:'password',
            message:'password incorrect'
            },
        ]
        }
      }

      return {
         user,
      }
      
  }
}