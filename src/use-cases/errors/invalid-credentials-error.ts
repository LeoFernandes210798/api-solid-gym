export class IvalidCredentialsError extends Error {
  constructor(){
    super('Invalid credentials.')
  }
}