import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolvers{
  @Query(() => [Post])
  posts(@Ctx() {em}:MyContext):Promise<Post[]>{

    return em.find(Post,{})
  }

  @Query(() =>Post ,{nullable:true})
  post(
    @Arg("id",()=>Int) id:number,
    @Ctx() { em }: MyContext 
    ):Promise<Post | null>{

    return em.findOne(Post, { id })
  }

}