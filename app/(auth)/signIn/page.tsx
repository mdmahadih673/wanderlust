import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth-shell"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Wanderlast account to manage your bookings.",
}

export default function SignInPage() {
  return (
    <AuthShell
      imageSrc="/assets/destinations/image2.png"
      title="Welcome back"
      description="Sign in to pick up where you left off and manage your trips."
      submitLabel="Sign In"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signUp"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signin-email">Email</FieldLabel>
          <Input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signin-password">Password</FieldLabel>
          <Input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
          <FieldDescription>
            Minimum 8 characters, at least one number.
          </FieldDescription>
        </Field>

        <div className="flex items-center justify-between gap-3">
          <FieldLabel className="flex w-fit items-center gap-2 font-normal">
            <Checkbox id="signin-remember" name="remember" />
            Remember me
          </FieldLabel>

          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </FieldGroup>
    </AuthShell>
  )
}
