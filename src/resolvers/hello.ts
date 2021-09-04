import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolvers {

  @Query(() => String)
  hello(){
    return "Hello World";
  }

}