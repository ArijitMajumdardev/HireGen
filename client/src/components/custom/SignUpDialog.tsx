import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import React, { useState } from "react";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  
  const SignUpDialog = ({
    openDialog,
    setOpenDialog,
  }: {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<boolean>;
  }) => {
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const [isLogin, setIsLogin] = useState(false);
  
    const closeDialog = () => setOpenDialog(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const toggleForm = () => setIsLogin((prev) => !prev);
  
    return (
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
            <DialogDescription>
              {isLogin
                ? "Log in to access your account and create resumes."
                : "Create an account to start building your resume."}
            </DialogDescription>
          </DialogHeader>
  
          <div className="space-y-4  h-40 ">
            {!isLogin && (
              <Input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleInputChange}
              />
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
  
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              disabled={
                !form.email || !form.password || (!isLogin && !form.name)
              }
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </div>
  
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="ml-2 text-blue-600"
                onClick={toggleForm}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default SignUpDialog;
  