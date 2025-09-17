"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import useLocalStorage from "@/lib/data/local-storage"
import { ShoppingCartItem } from "@/lib/types"
import Link from "next/link";

export default function HeaderCartButton() {

    const [cart, setCart] = useLocalStorage<ShoppingCartItem[]>("shopping-cart", []);

    const handleUpdateItemQuantity = (productId: number, quantity: number) => {
        const updatedCart = cart.map(item => {
            if (item.product.id === productId) {
                return { ...item, quantity };
            }
            return item;
        });
        setCart(updatedCart);
        toast.success(`Item quantity updated!`);
    }

    const handleRemoveFromCart = (productId: number) => {
        const updatedCart = cart.filter(item => item.product.id !== productId);
        setCart(updatedCart);
        toast.success(`Item removed from cart!`);
    }
    return (
        <Sheet>
            <SheetTrigger>
                <div className="flex flex-row content-center justify-center mr-2 ml-2 px-4 py-2 text-black rounded-md hover:bg-gray-100 hover:underline cursor-pointer">
                    <div className="flex flex-col content-center justify-center mr-4 rounded-full bg-gray-200 p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 16h9.45c.75 0 1.41-.41 1.75-1.03l3.24-6.16A1 1 0 0 0 21.7 7H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44C5.16 17.37 5.76 18 6.5 18h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63z" />
                        </svg>
                    </div>

                    <div className="flex flex-col content-center justify-center text-left">
                        <span className="text-sm text-gray-500">Cart</span>
                        <span className="font-bold">$0</span>
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    {cart.length === 0 ?
                        (<p className="text-center mt-8 text-gray-500">Your cart is currently empty.</p>)
                        : null
                    }
                </SheetDescription>
                <div>
                    {cart.map((item, index) => (
                        <div key={index} className="flex flex-row items-center border-b py-2 mx-4">
                            <div className="flex flex-col content-start justify-self-start mr-4">
                                <Link href={`/products/${item.product.id}`} className="font-bold hover:underline mb-1">{item.product.title}</Link>
                                <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                                    <button className="cursor-pointer"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                handleUpdateItemQuantity(item.product.id, item.quantity - 1);
                                            }
                                        }}
                                    >
                                        −
                                    </button>
                                    <span className="mx-4 text-lg font-medium select-none">{item.quantity}</span>
                                    <button className="cursor-pointer"
                                        onClick={() => {
                                            if (item.quantity < item.product.stock) {
                                                handleUpdateItemQuantity(item.product.id, item.quantity + 1);
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-self-end mr-4 flex-grow">
                                <span className="font-bold">${item.product.price * item.quantity}</span>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.product.id)} className="text-sm text-red-500 hover:underline ">X</button>
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <div className="flex flex-col content-center justify-center text-center">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="font-bold">$0</span>
                        <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-[var(--primary-green)] disabled:opacity-50" disabled>
                            Checkout
                        </button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}