import {  Context, Hono } from 'hono'
import { handleUserDetail, handleUserLogin, handleUserSignup } from './controllers/user'
import { cors } from 'hono/cors'
import { handle_Auth_Middleware } from './middlewares/authMiddleware'
import { Get_Resume, GetResumeList, handleCreateResume, updateExperience, updateResume } from './controllers/resume'
import { logger } from 'hono/logger'
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

app.use(logger())
app.use('*', cors())



app.post('/signup',handleUserSignup)
app.post('/login', handleUserLogin)
app.get("/user-detail",handleUserDetail)

app.post("/create-resume", handle_Auth_Middleware, handleCreateResume)
app.get("/resume-list", handle_Auth_Middleware, GetResumeList)
app.put("update-resume",handle_Auth_Middleware,updateResume)
app.get("/get-resume/:resumeId", handle_Auth_Middleware, Get_Resume)
app.put("update-experience",handle_Auth_Middleware,updateExperience)



export default app
