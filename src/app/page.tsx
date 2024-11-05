import { getAuthenticatedUser } from "./auth/authUser";
import AuthFormsTabs from "@/components/custom/AuthFormsTab";
import { Logo } from "@/components/custom/Logo";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect('/dashboard')
  }

    return (
      <div className="w-full h-screen grid md:grid-cols-5 items-center justify-center ">
        {/* Left Column */}
        <div className="flex flex-cols h-screen py-12 col-span-2 px-8 items-center justify-center relative">
        <div className="fixed top-0 left-0 right-0 py-2 px-5 flex items-center z-50">
          <Logo /> 
        </div>
        {/* Spacer to prevent overlap */}
        <div className="mt-20"></div>

          <div className="mx-auto grid">
            <div className="grid gap-2 text-left">
              <AuthFormsTabs />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hidden md:flex col-span-3 h-screen bg-black items-center justify-center text-white">
          <div className="mx-auto grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Sign Up!</h1>
            <p className="text-balance">
              Save, delete and heart all your pictures on this fantastic app.
            </p>
          </div>
        </div>
      </div>
    )
}
