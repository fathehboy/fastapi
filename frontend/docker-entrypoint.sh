#!/bin/sh
set -e

echo "🚀 Generating runtime environment configuration..."

cat <<EOF > /tmp/env-config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL:-}",
  VITE_APM_SERVER_URL: "${VITE_APM_SERVER_URL:-}",
  VITE_APM_SERVICE_NAME: "${VITE_APM_SERVICE_NAME:-frontend}",
  VITE_APM_ENVIRONMENT: "${VITE_APM_ENVIRONMENT:-local}",
  VITE_APM_ACTIVE: "${VITE_APM_ACTIVE:-false}",
  VITE_APM_DISTRIBUTED_TRACING_ORIGINS: "${VITE_APM_DISTRIBUTED_TRACING_ORIGINS:-}"
};
EOF

echo "✅ Config generated at /tmp/env-config.js"
exec "$@"