import { User } from "src/entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
class UsernamePasswordInput{
    @Field()
    username:string;
    @Field()
    password:string;
}

@Resolver()
export class UserResolvers {
  @Mutation(()=>String)
  async register(@Arg('options') options:UsernamePasswordInput,@Ctx(){em}:MyContext){
      const user = em.create(User,{username:options.username});
      await em.persistAndFlush(user);
      return "Created";
  }

}