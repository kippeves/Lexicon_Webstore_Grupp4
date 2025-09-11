export default function StockStatus({ availabilityStatus }: { availabilityStatus: string }) {
    return (
        <p className="text-sm text-gray-500 flex items-center gap-2">
            {availabilityStatus === "In Stock" ? (
                <span className="inline-flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-5" />
                        </svg>
                    </span>
                    In Stock
                </span>
            ) : (
                <span className="inline-flex items-center">
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 16 16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5l6 6M11 5l-6 6" />
                        </svg>
                    </span>
                    {availabilityStatus}
                </span>
            )}
        </p>
    );
}