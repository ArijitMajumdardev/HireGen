import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { getPrisma } from "../../prisma/PrismaClient";
import { Context } from "hono";



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
        if (!user) return c.json({ message: "Invalid credentials" });
    
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return c.json({ message: "Invalid credentials" });
    
        const token = jwt.sign({ userId: user.id }, c.env.JWT_SECRET, { expiresIn: "1h" });
    
        return c.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      } catch (error) {
        return c.json({ message: "Something went wrong" });
      }
    
}
// const  handleUserDetail = async (c:Context) : Promise<any> => {
    
//     try {
//         const token = c.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(401).json({ message: "Unauthorized" });
    
//         const decoded: any = jwt.verify(token, JWT_SECRET);
//         const user = await prisma.user.findUnique({
//           where: { id: decoded.userId },
//           select: { id: true, name: true, email: true },
//         });
    
//         if (!user) return res.status(404).json({ message: "User not found" });
    
//         return res.json(user);
//       } catch {
//         return res.status(401).json({ message: "Invalid token" });
//       }
    
// }





export {handleUserSignup,handleUserLogin}