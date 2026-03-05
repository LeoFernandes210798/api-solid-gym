import { UsersRepository } from "@/repositories/users-repository";
import { IvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "generated/prisma/client";

interface AuthentticateUseCaseRequest{
  email: string;
  password: string;
}

interface AuthentticateUseCaseResponse {
  user: User;
}

export class AuthentticateUseCase{
  constructor (private userRepository: UsersRepository){}

  async execute({ 
    email, 
    password 
  }:AuthentticateUseCaseRequest):Promise<AuthentticateUseCaseResponse>{
    const user = await this.userRepository.findByEmail(email)

    if(!user){
      throw new IvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches){
      throw new IvalidCredentialsError()
    }
    return {
      user,
    }    
  }
}