#!/usr/bin/env bash
# Import a new draft catalog record from "for dear Matthias .docx" into Docker DB.
# Reads only the Example column from the Word tables (no invented values).
# RTI file is uploaded separately afterwards in the admin UI.
#
# Usage:
#   ./scripts/enrich-record.sh
#   ./scripts/enrich-record.sh --dry-run
#   ./scripts/enrich-record.sh --overwrite # update existing record metadata
#
# Env:
#   RTIDB_CONTAINER  Server container name (default: rtidb-server)
#   RTIDB_DOCX       Path to the Word file (default: for dear Matthias .docx)

set -euo pipefail
cd "$(dirname "$0")/.."

CONTAINER="${RTIDB_CONTAINER:-rtidb-server}"
DOCX="${RTIDB_DOCX:-for dear Matthias .docx}"
WAIT_ATTEMPTS="${RTIDB_WAIT_ATTEMPTS:-60}"
WAIT_SECONDS="${RTIDB_WAIT_SECONDS:-2}"

wait_for_container() {
  local attempt=0
  local status=""

  while (( attempt < WAIT_ATTEMPTS )); do
    status="$(docker inspect -f '{{.State.Status}}' "$CONTAINER" 2>/dev/null || echo missing)"

    if [[ "$status" == "running" ]]; then
      if docker exec "$CONTAINER" node -e "process.exit(0)" >/dev/null 2>&1; then
        return 0
      fi
    elif [[ "$status" == "exited" || "$status" == "dead" ]]; then
      echo "Container \"$CONTAINER\" is $status. Recent logs:" >&2
      docker logs --tail 40 "$CONTAINER" >&2 || true
      exit 1
    fi

    attempt=$((attempt + 1))
    echo "Waiting for container \"$CONTAINER\" (status: ${status:-unknown})... ($attempt/$WAIT_ATTEMPTS)"
    sleep "$WAIT_SECONDS"
  done

  echo "Timed out waiting for container \"$CONTAINER\" (last status: ${status:-unknown}). Recent logs:" >&2
  docker logs --tail 40 "$CONTAINER" >&2 || true
  exit 1
}

run_via_compose() {
  if [[ ! -f "$DOCX" ]]; then
    echo "Word document not found: $DOCX" >&2
    exit 1
  fi

  local docx_abs scripts_abs
  docx_abs="$(cd "$(dirname "$DOCX")" && pwd)/$(basename "$DOCX")"
  scripts_abs="$(pwd)/scripts"

  echo "Node not found on host — running record sync via one-off Docker container..."
  echo "  Docx:    $docx_abs"
  echo "  Scripts: $scripts_abs"

  docker compose run --rm --no-deps \
    -w /scripts \
    -e RTIDB_DOCX=/docx/catalog.docx \
    -v "$docx_abs:/docx/catalog.docx:ro" \
    -v "$scripts_abs:/scripts:ro" \
    server \
    sh -c 'command -v unzip >/dev/null || apk add --no-cache unzip >/dev/null; exec node enrich-record-in-container.mjs '"$(printf '%q ' "$@")"

  echo ""
  echo "Record sync completed successfully."
}

if command -v node >/dev/null 2>&1; then
  exec node scripts/enrich-record.mjs "$@"
fi

run_via_compose "$@"
