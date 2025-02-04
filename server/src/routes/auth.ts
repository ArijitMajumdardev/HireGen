import express, { Router }  from "express"
import { handleUserDetail, handleUserLogin, handleUserSignup } from "../controllers/authController"
export const userRouter  = express.Router() 


// userRouter.get("/detail",authmiddleware,handlegetUser,getAllfavourites)
userRouter.post("/signup",handleUserSignup)
userRouter.post("/login",handleUserLogin)
userRouter.post("/user-detail", handleUserDetail)

