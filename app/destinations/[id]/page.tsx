import Link from "next/link";
import {
    MapPin,
    CalendarDays,
    Star,
    Clock,
    Check,
    ArrowLeft,
    ArrowRight,
    Pencil,
    ShieldCheck,
    Headphones,
    Plane,
} from "lucide-react";
import Image from "next/image";

// This route reads uncached data (fetch + await params) and the Navbar uses
// usePathname(), so it must render per-request instead of being prerendered.
export const instant = false;

const DestinationDetailsPage = async ({params,}: {params: Promise<{ id: string }>;}) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/destinations/${id}`);

    if (!res.ok) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Destination Not Found
                </h1>
                <p className="mt-3 text-gray-500">
                    Sorry, we couldnt find this destination.
                </p>

                <Link
                    href="/destinations"
                    className="mt-6 rounded-lg bg-cyan-600 px-6 py-3 text-white transition hover:bg-cyan-700"
                >
                    Back to Destinations
                </Link>
            </div>
        );
    }

    const data = await res.json();

    const highlights = [
        "Scenic mountain landscapes",
        "Explore local culture",
        "Unforgettable sightseeing",
        "Comfortable accommodation",
        "Amazing photography spots",
        "24/7 customer support",
    ];

    return (
        <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                {/* Top Navigation */}
                <div className="mb-5 flex items-center justify-between">
                    <Link
                        href="/destinations"
                        className="flex items-center gap-2 text-sm text-gray-500 transition hover:text-cyan-600"
                    >
                        <ArrowLeft size={16} />
                        Back to Destinations
                    </Link>

                    <Link
                        href={`/destinations/${id}/edit`}
                        className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-cyan-500 hover:text-cyan-600"
                    >
                        <Pencil size={14} />
                        Edit
                    </Link>
                </div>

                {/* Hero Image */}
                <div className="relative h-[250px] overflow-hidden rounded-xl sm:h-[350px] lg:h-[430px]">
                    <Image
                        fill
                        sizes="100vw"
                        src={data.imageUrl}
                        alt={data.name}
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-5 text-white sm:bottom-8 sm:left-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                            <MapPin size={13} />
                            {data.country}
                        </span>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
                            {data.name}
                        </h1>

                        <p className="mt-2 text-sm text-white/90 sm:text-base">
                            Discover your next unforgettable adventure.
                        </p>
                    </div>

                    <div className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm">
                        {data.category}
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
                    {/* Left Content */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Destination Info */}
                        <section className="border-b border-gray-100 pb-6">
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} className="text-cyan-600" />
                                    {data.country}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Clock size={16} className="text-cyan-600" />
                                    {data.duration}
                                </span>

                                <span className="flex items-center gap-2">
                                    <CalendarDays size={16} className="text-cyan-600" />
                                    Departure: {data.departureDate}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                                    {data.name}
                                </h2>

                                <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-600">
                                    <Star size={15} fill="currentColor" />
                                    4.9
                                    <span className="text-amber-700/70">(234 reviews)</span>
                                </span>
                            </div>
                        </section>

                        {/* Overview */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Overview
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
                                {data.description}
                            </p>
                        </section>

                        {/* Highlights */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900">
                                Highlights
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-500">
                                Make the most of your journey with unforgettable experiences,
                                beautiful scenery, and memorable adventures.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                {highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 text-sm text-gray-600"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                                            <Check size={13} className="text-green-600" />
                                        </span>

                                        {highlight}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Travel Benefits */}
                        <section className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-cyan-50 p-2.5">
                                    <Plane size={20} className="text-cyan-600" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Easy Planning
                                    </h4>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Plan your trip with ease.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-green-50 p-2.5">
                                    <ShieldCheck size={20} className="text-green-600" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        Safe Travel
                                    </h4>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Travel with confidence.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-purple-50 p-2.5">
                                    <Headphones size={20} className="text-purple-600" />
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">
                                        24/7 Support
                                    </h4>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Help whenever you need it.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Booking Card */}
                    <aside>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
                            <p className="text-sm text-gray-500">Starting from</p>

                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-4xl font-bold tracking-tight text-cyan-600">
                                    ${Number(data.price).toLocaleString("en-US")}
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-gray-400">per person</p>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <label className="mb-1 block text-xs text-gray-500">
                                        Departure Date
                                    </label>

                                    <p className="text-sm font-medium text-gray-800">
                                        {data.departureDate}
                                    </p>
                                </div>

                                <div className="rounded-lg border border-gray-200 p-3">
                                    <label className="mb-1 block text-xs text-gray-500">
                                        Trip Duration
                                    </label>

                                    <p className="text-sm font-medium text-gray-800">
                                        {data.duration}
                                    </p>
                                </div>

                                <Link
                                    href={`/destinations/${id}/book`}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
                                >
                                    Book Now
                                    <ArrowRight size={17} />
                                </Link>
                            </div>

                            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                                {[
                                    "Free cancellation up to 7 days",
                                    "Travel assistance included",
                                    "24/7 customer support",
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 text-xs text-gray-500"
                                    >
                                        <Check size={14} className="shrink-0 text-green-600" />
                                        {benefit}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-lg bg-cyan-50 p-3">
                                <p className="text-xs leading-5 text-cyan-800">
                                    Ready for your next adventure? Reserve your trip and start
                                    planning your journey.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default DestinationDetailsPage;