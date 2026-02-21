/**
 * Mapeamento das imagens do baralho Rider-Waite via CDN (tarot-card-img)
 * https://www.npmjs.com/package/tarot-card-img
 */
const CDN_BASE = "https://cdn.jsdelivr.net/npm/tarot-card-img@0.1.0";

// Minor Arcana: número -> sufixo do arquivo (1-10, page, knight, queen, king)
const CUPS_MAP = ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "pc", "nc", "qc", "kc"];
const PENTACLES_MAP = ["1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "pp", "np", "qp", "kp"];
const SWORDS_MAP = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "ps", "ns", "qs", "ks"];
const WANDS_MAP = ["1w", "2w", "3w", "4w", "5w", "6w", "7w", "8w", "9w", "10w", "pw", "nw", "qw", "kw"];

export function getTarotCardImageUrl(cardId: string): string {
  const index = parseInt(cardId.replace("card_", ""), 10);

  if (index >= 0 && index <= 21) {
    return `${CDN_BASE}/major/${index}m.jpg`;
  }
  if (index >= 22 && index <= 35) {
    return `${CDN_BASE}/cups/${CUPS_MAP[index - 22]}.jpg`;
  }
  if (index >= 36 && index <= 49) {
    return `${CDN_BASE}/pentacles/${PENTACLES_MAP[index - 36]}.jpg`;
  }
  if (index >= 50 && index <= 63) {
    return `${CDN_BASE}/swords/${SWORDS_MAP[index - 50]}.jpg`;
  }
  if (index >= 64 && index <= 77) {
    return `${CDN_BASE}/wands/${WANDS_MAP[index - 64]}.jpg`;
  }

  return "";
}
