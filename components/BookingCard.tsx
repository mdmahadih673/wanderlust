import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { type Destination } from "@/components/destinations-grid"

const BookingCard = async ({ data, params }: { data: Destination; params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
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
    );
};

export default BookingCard;
