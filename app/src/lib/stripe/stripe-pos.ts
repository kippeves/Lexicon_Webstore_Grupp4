import Stripe from "stripe";
import { ShoppingCartItem } from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items } = await req.json() as { items: ShoppingCartItem[]}; // items from your external API/cart

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.product.price * 100, // price in cents
        product_data: {
          name: item.product.title,
          description: item.product.description,
          images: [item.product.thumbnail],
        },
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/?canceled=true`,
  });

  return new Response(JSON.stringify({ url: session.url }));
}
