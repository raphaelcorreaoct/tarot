import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface SessionProps {
  name: string;
  email: string;
  newsletter: boolean;
}

export const createCheckoutSession = async ({
  name,
  email,
  newsletter,
}: SessionProps) => {
  const response = await fetch("/api/checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, newsletter }),
  });
  const { sessionId } = await response.json();

  const stripe = await stripePromise;
  const result = await stripe?.redirectToCheckout({ sessionId });
  if (result?.error) {
    console.error(result.error);
  }
};
