'use client';

import SignupForm from "@/components/forms/signupForm";
import LoginForm from "@/components/forms/loginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";

export default function AuthFormsTabs() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    if (isSignedUp) {
      const timer = setTimeout(() => {
        setIsSignedUp(false);
      }, 5000);
      // Cleanup the timer if the component unmounts or `isSignedUp` changes  
      return () => clearTimeout(timer);
    }
  }, [isSignedUp])

  console.log('isSignedUp', isSignedUp)

  // Handler to set `isSignedUp` state when signup is successful
  const handleSignupSuccess = () => {
    setIsSignedUp(true);
  };

  return (
    <>
      {!isSignedUp ? (
        <Tabs defaultValue="login" className="min-w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold pb-3">Registration Complete!</h1>
          <p className="text-balance">Please close this window and check your email <br/> (including your spam folder) <br />to complete the registration process.</p>
        </div>
      )}
    </>
  );
}
