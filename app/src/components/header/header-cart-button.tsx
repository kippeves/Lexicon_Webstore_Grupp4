"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import useLocalStorage from "@/lib/data/local-storage";
import { ShoppingCartItem } from "@/lib/types";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function HeaderCartButton() {
  const [cart, setCart] = useLocalStorage<ShoppingCartItem[]>(
    "shopping-cart",
    []
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleUpdateItemQuantity = (productId: number, quantity: number) => {
    const updatedCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
    toast.success(`Item quantity updated!`);
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    setCart(updatedCart);
    toast.success(`Item removed from cart!`);
  };

  if (!mounted) {
    return null; // prevent SSR/client mismatch
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div
          className={cn(
            "flex flex-row items-center justify-center text-black rounded-md hover:bg-accent cursor-pointer gap-1.5 px-3 md:px-4 py-3"
          )}
        >
          <div className="relative flex items-center justify-center rounded-full ">
            <ShoppingBasket size={28} color="black" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-green text-white text-xs font-bold ">
                {totalItems}
              </span>
            )}
          </div>
          <div className="hidden md:flex flex-col justify-center text-left">
            {totalItems > 0 ? (
              <>
                <span className="text-sm font-bold">
                  {totalPrice.toFixed(2)}$
                </span>
              </>
            ) : (
              <span className="text-sm font-bold">Cart</span>
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-center">
          {totalItems === 0 ? (
            <span className="mt-8 text-gray-500">
              Your cart is currently empty.
            </span>
          ) : null}
        </SheetDescription>
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center border-b py-2 mx-4"
            >
              <div className="flex flex-col content-start justify-self-start mr-4">
                <Link
                  href={`/products/${item.product.id}`}
                  className="font-bold hover:underline mb-1"
                >
                  {item.product.title}
                </Link>
                <div className="flex flex-row items-center border rounded-lg px-4 py-2 bg-white shadow-sm">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      if (item.quantity > 1) {
                        handleUpdateItemQuantity(
                          item.product.id,
                          item.quantity - 1
                        );
                      }
                    }}
                  >
                    −
                  </button>
                  <span className="mx-4 text-lg font-medium select-none">
                    {item.quantity}
                  </span>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      if (item.quantity < item.product.stock) {
                        handleUpdateItemQuantity(
                          item.product.id,
                          item.quantity + 1
                        );
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-self-end mr-4 flex-grow">
                <span className="font-bold">{totalPrice.toFixed(2)}$</span>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.product.id)}
                className="text-sm text-red-500 hover:underline "
              >
                X
              </button>
            </div>
          ))}
        </div>
        <SheetFooter>
          <div className="flex flex-col content-center justify-center text-center">
            <span className="text-sm text-gray-500">Total:</span>
            <span className="font-bold">
              {totalItems ? totalPrice.toFixed(2) : 0}$
            </span>
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-primary-green disabled:opacity-50"
              disabled
            >
              Checkout
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
