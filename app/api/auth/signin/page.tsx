import React from "react";
import LoginForm from "@/app/components/LoginForm";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default SignInPage;
