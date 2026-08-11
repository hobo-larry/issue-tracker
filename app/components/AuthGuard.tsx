import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/auth/authOptions";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = async ({ children }: AuthGuardProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <>{children}</>;
};

export default AuthGuard;