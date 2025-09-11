export default function ProductPrice({ price, discountPercentage }: { price: number, discountPercentage?: number }) {
    const discountedPrice = discountPercentage
        ? + (price - (price * discountPercentage / 100)).toFixed(2)
        : price;

    return (
        <div className="flex flex-row gap-2 items-center items-baseline justify-start mt-2">
            <p className={`text-lg font-bold ${discountPercentage ? " text-red-600" : ""}`}>${discountedPrice}</p>
            {discountPercentage && (
                <p className="text-sm text-gray-500 line-through">${price}</p>
            )}
        </div>
    );
}
