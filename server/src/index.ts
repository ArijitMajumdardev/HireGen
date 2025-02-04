import express, { Express, Request, Response } from "express";
import { userRouter } from "./routes/auth";
import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});



app.use("/auth", userRouter);


app.listen(port, () => {
  console.log(`[server]: Server is still running at http://localhost:${port}`);
});