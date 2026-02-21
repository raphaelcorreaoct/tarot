import type { ITarotCard } from "@/app/data/tarot-cards";
import { getTarotCardImageUrl } from "@/app/data/tarot-card-images";

const POSITIONS = ["Passado", "Presente", "Futuro"];

export interface ISendReadingEmailParams {
  to: string;
  cards: ITarotCard[];
  reading: string;
}

export async function sendReadingEmail({
  to,
  cards,
  reading,
}: ISendReadingEmailParams): Promise<boolean> {
  const apiKey = process.env.MAILERSEND_API_KEY;
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
  const fromName = process.env.MAILERSEND_FROM_NAME ?? "Tarot";

  if (!apiKey || !fromEmail) {
    console.warn("MailerSend não configurado (MAILERSEND_API_KEY ou MAILERSEND_FROM_EMAIL ausente)");
    return false;
  }

  const cardsList = cards
    .map(
      (card, i) =>
        `• ${POSITIONS[i]}: ${card.name} — ${card.shortMeaning}`
    )
    .join("\n");

  const text = `Sua leitura de tarot — 3 cartas (Passado, Presente, Futuro)

Suas cartas:
${cardsList}

Interpretação por IA:
${reading}

—
Esta é sua leitura personalizada, gerada por inteligência artificial. Guarde-a para refletir no seu momento.`;

  const cardImagesHtml = cards
    .map(
      (card, i) => {
        const imgUrl = getTarotCardImageUrl(card.id);
        if (!imgUrl) return "";
        const escapedName = card.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const escapedMeaning = card.shortMeaning.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `
    <td style="text-align: center; padding: 8px; vertical-align: top;">
      <img src="${imgUrl}" alt="${escapedName}" width="120" height="210" style="max-width: 120px; height: auto; border-radius: 8px; display: block; margin: 0 auto;">
      <p style="margin: 8px 0 0; font-size: 0.85rem; font-weight: 600;">${POSITIONS[i]}</p>
      <p style="margin: 2px 0 0; font-size: 0.8rem; color: #666;">${escapedName}</p>
      <p style="margin: 2px 0 0; font-size: 0.75rem; color: #999;">${escapedMeaning}</p>
    </td>`;
      }
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <h1 style="color: #7c3aed; font-size: 1.5rem;">Sua leitura de tarot</h1>
  <p style="color: #666; font-size: 0.9rem;">3 cartas — Passado, Presente, Futuro</p>
  
  <h2 style="font-size: 1.1rem; margin-top: 24px;">Suas cartas</h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
    <tr>${cardImagesHtml}</tr>
  </table>
  
  <h2 style="font-size: 1.1rem; margin-top: 24px;">Interpretação por IA</h2>
  <p style="white-space: pre-line; background: #f5f0ff; padding: 16px; border-radius: 8px; border-left: 4px solid #7c3aed;">${reading.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
  
  <p style="margin-top: 32px; font-size: 0.85rem; color: #999;">Leitura personalizada gerada por inteligência artificial. Guarde-a para refletir no seu momento.</p>
</body>
</html>`;

  try {
    const res = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: fromEmail,
          name: fromName,
        },
        to: [{ email: to, name: to.split("@")[0] }],
        subject: "Sua leitura de tarot — 3 cartas",
        text,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("MailerSend error:", res.status, err);
      return false;
    }

    return true;
  } catch (err) {
    console.error("MailerSend send error:", err);
    return false;
  }
}
