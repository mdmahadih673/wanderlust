import type { Metadata } from "next"
import Link from "next/link"

import { AuthShell } from "@/components/auth-shell"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Wanderlast account to start booking your next trip.",
}

export default function SignUpPage() {
  return (
    <AuthShell
      imageSrc="/assets/destinations/image1.png"
      title="Create your account"
      description="Save your favorite destinations and book trips in a couple of clicks."
      submitLabel="Create Account"
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jordan Lee"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <Input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-image">Image Link</FieldLabel>
          <Input
            id="signup-image"
            name="image"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            required
          />
          <FieldDescription>
            A profile photo URL — you can use your Gravatar link.
          </FieldDescription>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <Input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="signup-confirm">Confirm Password</FieldLabel>
            <Input
              id="signup-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
            />
          </Field>
        </div>

        <FieldDescription>
          By creating an account you agree to our{" "}
          <Link
            href="/terms"
            className="text-primary underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </FieldDescription>
      </FieldGroup>
    </AuthShell>
  )
}
