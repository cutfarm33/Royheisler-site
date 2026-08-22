#!/usr/bin/env bash
# Checks whether every Vimeo video used on the site can actually be embedded.
#
#   200 = embeddable, the page will play it
#   401 = Vimeo is refusing the embed (fix in Vimeo, not in this repo:
#         video Settings -> Privacy -> "Where can this be embedded?")
#   403 = the privacy hash in the URL is wrong or stale for that video
#
# Usage: ./scripts/check-vimeo.sh
set -uo pipefail
cd "$(dirname "$0")/.."

fail=0
grep -rho 'https://vimeo\.com/[0-9]*\(/[0-9a-f]*\)\?' src/content/projects \
  | sort -u \
  | while read -r url; do
      id=$(sed -E 's|.*vimeo\.com/([0-9]+).*|\1|' <<<"$url")
      hash=$(sed -nE 's|.*vimeo\.com/[0-9]+/([0-9a-f]+).*|\1|p' <<<"$url")
      embed="https://player.vimeo.com/video/$id"
      [ -n "$hash" ] && embed="$embed?h=$hash"
      code=$(curl -s -o /dev/null -w '%{http_code}' "$embed")
      case "$code" in
        200) status="ok" ;;
        401) status="BLOCKED — embed privacy" ; fail=1 ;;
        403) status="BLOCKED — bad/stale hash" ; fail=1 ;;
        *)   status="unexpected" ; fail=1 ;;
      esac
      printf '%-12s %-4s %s\n' "$id" "$code" "$status"
    done

echo
echo "Blocked videos are fixed in Vimeo, not here:"
echo "  Video -> Settings -> Privacy -> \"Where can this be embedded?\" -> Anywhere"
