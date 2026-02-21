declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Envia um evento para o Google Tag Manager.
 * Use no GTM para configurar tags (GA4, conversões, etc.)
 *
 * @example
 * // Evento de página visualizada (geralmente automático)
 * pushToDataLayer({ event: 'page_view', page_path: window.location.pathname });
 *
 * @example
 * // Evento de compra
 * pushToDataLayer({
 *   event: 'purchase',
 *   value: 9.90,
 *   currency: 'BRL',
 *   transaction_id: 'abc123',
 * });
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}
