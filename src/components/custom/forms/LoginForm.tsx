import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { LoginFormFields } from "../_data";

export default function LoginForm() {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof LoginFormSchema>>({
      resolver: zodResolver(LoginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof LoginFormSchema>> = (
      data
    ) => {
      console.log('data', data)
    }

    return (
      <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-md p-8 space-y-4">
        {LoginFormFields.map(({ fieldName, fieldType, placeholder }, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Label htmlFor={fieldName}>{placeholder}</Label>
            <Input
              type={fieldType}
              id={fieldName}
              {...register(fieldName)}
              className="border-2 p-2"
              disabled={isSubmitting}
            />
            {errors[fieldName] && (
              <span className="text-red-500">{errors[fieldName]?.message}</span>
            )}
          </div>
        ))}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
    )
}