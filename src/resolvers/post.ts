import { Post } from "src/entities/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolvers{

  @Query(() => [Post])
  posts(){
    return "bye";
  }

}