import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { getPrisma } from "../../prisma/PrismaClient";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";



 const  handleUserSignup = async (c:Context) : Promise<any> => {
    
    try {
      const prisma = getPrisma(c.env.DATABASE_URL)
        const { name, email, password } = await c.req.json();
  
        console.log("name : ",name)
    
      // const existingUser = await prisma.user.findUnique({ where: { email } });
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
        if (existingUser) {
          return c.json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });
      
      
      console.log("user : ",user)
  
      console.log(c.env.JWT_SECRET)
      const token = jwt.sign({ userId: user.id }, c.env.JWT_SECRET, { expiresIn: "1h" });
      
      console.log("token : ",token)
    
        return c.json({ message: "User registered successfully",token,user:{id: user.id, name: user.name, email: user.email } });
      } catch (error) {
        return c.json({ message: "Something went wrong",error });
      }
    
  }
  

  
const  handleUserLogin = async (c:Context) : Promise<any> => {
   
    try {
      const { email, password } = await c.req.json();
      
        const prisma = getPrisma(c.env.DATABASE_URL)
    
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new HTTPException(401,{ message: "Invalid credentials"})
        }
    
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new HTTPException(401,{ message: "Invalid credentials"})
    
        const token = jwt.sign({ userId: user.id }, c.env.JWT_SECRET, { expiresIn: "7d" });
    
        return c.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Login Error:", error);
      throw new HTTPException(401, { message: error instanceof Error ? error.message : "Unknown error" });
    }
    
}
const  handleUserDetail = async (c:Context) : Promise<any> => {
    
  try {
      
    const prisma = getPrisma(c.env.DATABASE_URL);
    
    const authHeader = c.req.header("authorization");

    console.log("auth",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      c.status(401)
      throw new HTTPException(401,{ message: "Unauthorized" });
    }
    // const token = c.headers.authorization?.split(" ")[1];
    const token = authHeader.split(" ")[1];
    if (!token) {
      c.status(404)    
      throw new HTTPException(404,{ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, c.env.JWT_SECRET);
    if (!decoded?.userId) {

      c.status(401)
      throw new HTTPException(401,{ message: "Invalid token" })
    }
// const user = undefined
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, name: true, email: true },
        });
    
    if (!user) {    
      throw new HTTPException(404,{ message: "User not found" });
    }
    
    c.status(200)
        return c.json(user);
  } catch {
    throw new HTTPException(401,{ message: "Invalid token" });
      }
    
}





export {handleUserSignup,handleUserLogin,handleUserDetail}