#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${1:-4173}"

cd "$ROOT_DIR"

echo "Starting annual review webpage..."
echo "Open: http://localhost:${PORT}"
echo
python3 -m http.server "$PORT"
