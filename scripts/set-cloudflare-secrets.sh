#!/usr/bin/env bash
set -euo pipefail

REPO="kimeastonsmithss/lighthouse"

read -rsp "Cloudflare API token: " CF_API_TOKEN
echo
read -rsp "Cloudflare account ID: " CF_ACCOUNT_ID
echo

printf '%s' "$CF_API_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo "$REPO"
printf '%s' "$CF_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID --repo "$REPO"

echo "Stored CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID on $REPO."
