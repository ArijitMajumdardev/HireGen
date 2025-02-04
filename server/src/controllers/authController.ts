import { Request, Response ,NextFunction} from "express"
import prisma from "../../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET! 

const  handleUserSignup = async (req: Request, res: Response) : Promise<any> => {
    
    console.log("hhhh")
    console.log(req.body)
    try {
        const { name, email, password } = req.body;

        console.log(name)
    
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    
        return res.status(201).json({ message: "User registered successfully",token,user:{id: user.id, name: user.name, email: user.email } });
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong",error });
      }
    
}
const  handleUserLogin = async (req: Request, res: Response) : Promise<any> => {
    
    try {
        const { email, password } = req.body;
    
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: "Invalid credentials" });
    
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    
        return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
      }
    
}
const  handleUserDetail = async (req: Request, res: Response) : Promise<any> => {
    
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });
    
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, name: true, email: true },
        });
    
        if (!user) return res.status(404).json({ message: "User not found" });
    
        return res.json(user);
      } catch {
        return res.status(401).json({ message: "Invalid token" });
      }
    
}





export {handleUserSignup,handleUserLogin,handleUserDetail}