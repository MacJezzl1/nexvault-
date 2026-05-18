import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { signUpAction } from "@/app/auth/actions";

type Props = {
  searchParams?: {
    error?: string;
  };
};

export default function SignUpPage({ searchParams }: Props) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full">
        <AuthCard
          title="Create account"
          description="Start with a personal vault and upgrade into shared organization memory later."
          actionLabel="Create account"
          action={signUpAction}
          mode="sign-up"
          error={searchParams?.error}
        />
        <p className="mt-4 text-center text-sm text-steel">
          Already registered?{" "}
          <Link href="/auth/sign-in" className="text-amber">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
