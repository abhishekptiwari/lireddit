import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolvers{
  //Read--All Data
  @Query(() => [Post])
  posts(@Ctx() {em}:MyContext):Promise<Post[]>{

    return em.find(Post,{})
  }
 
  //Read--Data(individual)
  @Query(() =>Post ,{nullable:true})
  post(@Arg("id") id:number,@Ctx() { em }: MyContext):Promise<Post | null>{
    return em.findOne(Post, { id });
  }

  //Create--Data
  @Mutation(() => Post)
  async createPost(@Arg("title") title:string,@Ctx() { em }: MyContext):Promise<Post>{
    const post=em.create(Post,{title});
    await em.persistAndFlush(post);
    return post;
  }

  //Update--Data
  @Mutation(() => Post,{nullable:true})
  async updatePost(@Arg("id") id:number,@Arg("title",()=>String,{nullable:true}) title:string,
  @Ctx() { em }: MyContext 
  ):Promise<Post | null >{
     const post=await em.findOne(Post,{id})
     if(!post){
       return null;
     }
     if(typeof title !=="undefined"){
       post.title=title;
       await em.persistAndFlush(post);
     }
    return post;
  }

  //Delete--Data
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id:number,@Ctx() { em }: MyContext):Promise<boolean >{
    await em.nativeDelete(Post,{id})
    return true;
  }
}