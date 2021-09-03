import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {

  const orm =await MikroORM.init(microConfig);
  // await orm.getMigrator().up();

  const app = express();

    const apolloServer = new ApolloServer({}),

    apolloServer.applyMiddleware({ app });

  app.get('/',(_,res)=>{
      res.send('Hello ')
      
  })

  app.listen(4000,()=>{
    console.log('Server started on localhost:4000');
    
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