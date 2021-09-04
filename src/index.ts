import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core'
import express from 'express';
import microConfig from "./mikro-orm.config";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolvers } from './resolvers/hello';
import { PostResolvers } from "./resolvers/post";


const main = async () => {

  const orm =await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolvers,PostResolvers ],
      validate:false,
    }),
    context:()=>({em:orm.em})
  });


  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: '/graphql'})


  app.listen(4000,()=>{
    console.log("Server started on localhost:4000");
    
  })

};

main().catch((err)=>{
    console.log(err);
    
})


/*
  // const post = orm.em.create(Post,{title:"my first post"})
  // await orm.em.persistAndFlush(post);
  //const posts =await orm.em.find(Post,{});
  //console.log(posts);
*/
