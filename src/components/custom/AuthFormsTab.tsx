'use client';

import SignupForm from "@/components/forms/signupForm";
import LoginForm from "@/components/forms/loginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger  } from "../ui/tabs";

export default function AuthFormsTabs() {

  return (
    <Tabs defaultValue="login" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
}
