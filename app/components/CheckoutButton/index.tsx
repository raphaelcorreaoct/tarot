"use client";

import { useState } from "react";
import type { ICheckoutButtonProps } from "./types";

export function CheckoutButton({ plan, children, className }: ICheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Erro ao processar pagamento");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao processar pagamento");
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      aria-busy={loading}
      aria-disabled={loading}
    >
      {loading ? "Redirecionando..." : children}
    </button>
  );
}
