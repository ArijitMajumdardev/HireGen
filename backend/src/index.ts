import {  Hono } from 'hono'
import { handleUserLogin, handleUserSignup } from './controllers/user'
// import { prisma } from '../prisma/PrismaClient'


const app = new Hono<
  
{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
  }
>()





app.post('/signup',handleUserSignup)
app.post('/login',handleUserLogin)


export default app
