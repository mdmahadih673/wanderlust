'use client'

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { signIn, signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

// Browser er type="email" TLD require kore na, zod kore — tai same boundary check.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function SignUpPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            Array.from(formData.entries(), ([key, value]) => [key, value.toString().trim()])
        )

        setError(null)

        if (!EMAIL_RE.test(data.email)) {
            setError("Please enter a valid email address, e.g. name@example.com.")
            return
        }
        if (data.password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }
        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setPending(true)
        try {
            const { data: resData, error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image: data.image || undefined
            })

            if (error) {
                setError(error.message || "Could not create the account.")
                return
            }

            console.log(resData)
            router.push("/")
            router.refresh()
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }
    }



    const handleGoogleSignUp = async () => {
        setError(null);

        try {
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                setError(error.message || "Google sign-up failed.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-12 sm:py-20">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>
                        Sign up with your GitHub or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup>
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Field>
                                <Button variant="outline" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Sign up with GitHub
                                </Button>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleGoogleSignUp}
                                    disabled={pending}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Sign up with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Field>
                                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Jordan Lee"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="image">Image Link</FieldLabel>
                                <Input
                                    id="image"
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
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                    />
                                </Field>
                            </div>

                            <Field>
                                <Button type="submit" disabled={pending}>
                                    {pending ? (
                                        <>
                                            <Spinner /> Creating Account
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link
                                        href="/signIn"
                                        className="underline underline-offset-4 hover:text-foreground"
                                    >
                                        Sign in
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
            </FieldDescription>
        </div>
    )
}
