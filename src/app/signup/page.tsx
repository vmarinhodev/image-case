import SignupForm from "@/components/forms/signupForm";
import Form from "@/components/forms/signupTestForm";


export default function SignUp() {
  return (
    <div className="w-full lg:grid lg:grid-cols-5 min-h-screen flex sm:items-center sm:justify-center sm:grid">
      <div className="flex items-center justify-center py-12 col-span-2 px-8">
        <div className="mx-auto grid max-w-[540px] gap-6">
          <div className="grid gap-2 text-left">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block col-span-3 min-h-screen bg-gradient-to-t from-green-50 via-pink-100 to-purple-100">
        <div className="flex items-center justify-center py-12 col-span-2 px-4">
          <div className="mx-auto grid max-w-[540px] gap-4">
            <h1 className="text-3xl font-bold">Sign Up!</h1>
            <p className="text-balance text-muted-foreground">
              Save, delete and heart all your pictures on this fantastic app.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}