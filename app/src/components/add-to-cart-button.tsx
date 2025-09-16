"use client"
import { toast } from "sonner"
import useLocalStorage from "@/lib/data/local-storage"
import { Product, ShoppingCartItem } from "@/lib/types"
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {

    const [cart, setCart] = useLocalStorage<ShoppingCartItem[]>("shopping-cart", []);
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState<ShoppingCartItem>({ product, quantity: 1 });

    const handleAddToCart = () => {
        const existingProduct = cart.find(item => item.product.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
            setCart([...cart, { ...item }]);
        }
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="flex flex-row justify-start items-center gap-4 mt-2 mb-2">
            <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                <button
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1);
                            setItem({ product, quantity: quantity - 1 });
                        }
                    }}
                >
                    −
                </button>
                <span className="mx-4 text-lg font-medium select-none">{quantity}</span>
                <button
                    onClick={() => {
                        if (quantity < product.stock) {
                            setQuantity(quantity + 1);
                            setItem({ product, quantity: quantity + 1 });
                        }
                    }}
                >
                    +
                </button>
            </div>
            <button
                onClick={() => {
                    setItem({ product, quantity });
                    handleAddToCart();
                }}
                className="bg-[var(--primary-green)] hover:bg-green-700 text-white rounded-xl px-12 py-4 text-base font-medium cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 16h9.45c.75 0 1.41-.41 1.75-1.03l3.24-6.16A1 1 0 0 0 21.7 7H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.16 17.37 5.76 18 6.5 18h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
                </svg>
                Add to Cart
            </button>
        </div>

    )
}
