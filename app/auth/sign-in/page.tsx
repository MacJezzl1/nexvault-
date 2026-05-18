import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { signInAction } from "@/app/auth/actions";

type Props = {
  searchParams?: {
    error?: string;
  };
};

export default function SignInPage({ searchParams }: Props) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full">
        <AuthCard
          title="Sign in"
          description="Use the local MVP account system to open your private vault."
          actionLabel="Sign in"
          action={signInAction}
          mode="sign-in"
          error={searchParams?.error}
        />
        <p className="mt-4 text-center text-sm text-steel">
          Need an account?{" "}
          <Link href="/auth/sign-up" className="text-amber">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
