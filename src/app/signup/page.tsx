"use client";
import { SignupSchema, signupSchema } from "@/config/user/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ky from "ky";
import AuthCard from "@/components/inputs/AuthCard";
import { getErrorMessageAsync } from "@/lib/utils/errors";
import PopUpMessage from "@/components/PopUpMessage";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const methods = useForm<SignupSchema>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: { username: "", email: "", password: "" },
  });
  const { isSubmitting } = methods.formState;
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: SignupSchema) => {
    try {
      const res = await ky.post("/api/auth/signup", { json: data });
      if (res.ok) {
        setSignupSuccess(true);
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 3000);
      }
    } catch (e) {
      console.error(await getErrorMessageAsync(e));
      setErrorMessage("An error occurred during signup");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <AuthCard
          h2="Sign up today!"
          description="Become part of the club"
          inputs={[
            { name: "username", label: "Username", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ]}
          secondaryButtonLink={{ label: "Back to login", href: "/login" }}
          primaryButton={{ label: isSubmitting ? "Please wait..." : "Sign Up" }}
          isSubmitting={isSubmitting}
        />
      </form>

      <PopUpMessage
        title="Signup success"
        open={signupSuccess}
        description="Redirecting to shop. Place an order and see it on your account overview"
      />
      <PopUpMessage
        title="Signup failed"
        open={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        description={errorMessage || "An error occurred during signup"}
      />
    </FormProvider>
  );
}
