"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { ProfileEditButton } from "@/components/profile-edit-button"
import {
    DollarSignIcon,
    Globe2Icon,
    MapPinIcon,
    PlaneIcon,
    TrendingUpIcon,
    UserIcon,
} from "lucide-react"
import { signOut, useSession } from "@/lib/auth-client"

type Stat = {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
    iconClassName: string
}

// No bookings API yet — placeholder figures until the backend exposes them.
const stats: Stat[] = [
    {
        label: "Total Bookings",
        value: "12",
        icon: PlaneIcon,
        iconClassName: "bg-cyan-50 text-cyan-600",
    },
    {
        label: "Countries Visited",
        value: "18",
        icon: Globe2Icon,
        iconClassName: "bg-green-50 text-green-600",
    },
    {
        label: "Upcoming Trips",
        value: "2",
        icon: TrendingUpIcon,
        iconClassName: "bg-orange-50 text-orange-600",
    },
    {
        label: "Total Spent",
        value: "$15,750",
        icon: DollarSignIcon,
        iconClassName: "bg-pink-50 text-pink-600",
    },
]

function initials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
}

function formatMonthYear(value?: string | Date) {
    if (!value) return "—"
    const date = value instanceof Date ? value : new Date(value)
    if (Number.isNaN(date.getTime())) return "—"
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export default function ProfilePage() {
    const router = useRouter()
    const { data: session, isPending } = useSession()
    const user = session?.user

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
        router.refresh()
    }

    if (isPending) {
        return (
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 px-4 py-24 text-center">
                <Spinner className="size-6 text-primary" />
                <p className="text-sm text-muted-foreground">Loading your profile…</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="mx-auto w-full max-w-sm px-4 py-16 sm:py-24">
                <Card>
                    <CardContent className="flex flex-col items-center gap-4 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                            <UserIcon className="size-6 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                            <h1 className="font-heading text-xl font-medium">
                                You&apos;re signed out
                            </h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Sign in to view your profile, manage your bookings, and save
                                favorite destinations.
                            </p>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <Button nativeButton={false} render={<Link href="/signIn" />}>
                                Sign In
                            </Button>
                            <Button
                                variant="outline"
                                nativeButton={false}
                                render={<Link href="/signUp" />}
                            >
                                Create Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Profile
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
                Manage your account settings and travel preferences
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[19rem_1fr]">
                {/* Left — profile card */}
                <Card className="h-fit">
                    <CardContent className="flex flex-col items-center text-center">
                        <Avatar size="lg" className="size-52">
                            {user.image && (
                                <AvatarImage src={user.image} alt={user.name} />
                            )}
                            <AvatarFallback className="text-4xl">
                                {initials(user.name)}
                            </AvatarFallback>
                        </Avatar>

                        <h2 className="mt-5 font-heading text-xl font-semibold">
                            {user.name}
                        </h2>

                        

                        <Separator className="my-5" />

                        <dl className="w-full space-y-3 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <dt className="text-muted-foreground">Member since</dt>
                                <dd className="font-medium">{formatMonthYear(user.createdAt)}</dd>
                            </div>
                            
                        </dl>

                        <Separator className="my-5" />

                        <ProfileEditButton
                            user={user}
                            className="h-10 w-full justify-center gap-2 bg-cyan-600 text-sm font-semibold text-white hover:bg-cyan-700"
                        />
                    </CardContent>
                </Card>

                {/* Right — travel statistics */}
                <section aria-labelledby="travel-stats-heading">
                    <h2
                        id="travel-stats-heading"
                        className="font-heading text-xl font-semibold"
                    >
                        Travel Statistics
                    </h2>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {stats.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <Card key={stat.label}>
                                    <CardContent className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {stat.label}
                                            </p>
                                            <p className="mt-2 text-2xl font-bold tracking-tight">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <span
                                            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${stat.iconClassName}`}
                                        >
                                            <Icon className="size-5" />
                                        </span>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={<Link href="/bookings" />}
                        >
                            View My Bookings
                        </Button>
                        <Button variant="destructive" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    )
}
