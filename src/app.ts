import fastify from "fastify";
import { appRoutes } from "@/http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error ,_request , reply)=>{
  if (error instanceof ZodError){
    return reply
            .status(400)
            .send({message: 'validation error', issues: error.format()})
  }

  if (env.NODE_ENV !== 'production' ){
    console.log(error)
  }else{
    //deveria fazer o log para uma ferramenta externa datalog/newrelic
  }
  return reply.status(500).send({message:'Internal server error.'})
})