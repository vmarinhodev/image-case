'use client';
import React, { useState } from "react";
import SignupForm from "@/components/forms/signupForm";
import LoginForm from "@/components/forms/loginForm";

export default function AuthFormsTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      {/* Tab navigation */}
      <div className="flex justify-center border-b border-gray-300">
        <button
          className={`w-full py-3 text-lg font-medium ${activeTab === "login"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
            }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`w-full py-3 text-lg font-medium ${activeTab === "signup"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
            }`}
          onClick={() => setActiveTab("signup")}
        >
          Signup
        </button>
      </div>

      {/* Content below tabs */}
      <div className="p-6">
        {activeTab === "login" ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
      </div>
    </>
  );
}
