#!/usr/bin/env bash
# Envia variáveis do .env local para a Vercel
# Uso: ./scripts/push-env-to-vercel.sh [production|preview|development]
# Requer: vercel CLI (npm i -g vercel)

set -e
ENV_FILE="${ENV_FILE:-.env}"
TARGET="${1:-production}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Arquivo $ENV_FILE não encontrado."
  exit 1
fi

echo "Enviando variáveis de $ENV_FILE para Vercel ($TARGET)..."
echo ""

while IFS= read -r line; do
  # Ignora comentários e linhas vazias
  [[ "$line" =~ ^#.*$ ]] && continue
  [[ -z "${line// }" ]] && continue
  [[ "$line" != *"="* ]] && continue

  key="${line%%=*}"
  key="${key// }"
  value="${line#*=}"
  value="${value#\"}"
  value="${value%\"}"
  value="${value#\'}"
  value="${value%\'}"
  value="${value%%#*}"
  value="${value% }"

  [[ -z "$key" ]] && continue

  echo "  → $key"
  echo "$value" | vercel env add "$key" "$TARGET" 2>/dev/null || true
done < "$ENV_FILE"

echo ""
echo "Concluído. Faça um redeploy para aplicar as alterações."
