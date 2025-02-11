import { Context, Next } from "hono";
import { getPrisma } from "../../prisma/PrismaClient";
import jwt from "jsonwebtoken"

const  handle_Auth_Middleware = async (c:Context,next:Next) : Promise<any> => {
    
  try {
      
    const prisma = getPrisma(c.env.DATABASE_URL);
    
    const authHeader = c.req.header("authorization");

    console.log("auth",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      c.status(401)
      return c.json({ message: "Unauthorized" }, 401);
    }
    // const token = c.headers.authorization?.split(" ")[1];
    const token = authHeader.split(" ")[1];
    if (!token) {
      c.status(401)    
      return c.json({ message: "Unauthorized" });
    }
    
    const decoded: any = jwt.verify(token, c.env.JWT_SECRET);
    if (!decoded?.userId) {
      c.status(401)
      return c.json({ message: "Invalid token" }, 401)
    }

        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: { id: true, name: true, email: true },
        });
    
    if (!user) {
      c.status(404)    
      return c.json({ message: "User not found" });
    }
    
    // c.status(200)
      //       return c.json(user);
      c.set('user' ,user)
      await next()
  } catch {
    c.status(401)
        return c.json({ message: "Invalid token" });
      }
    
}


export {handle_Auth_Middleware}