import { init as initApm } from '@elastic/apm-rum'

// Helper buat get env with runtime support
const getEnv = (key) => window._env_?.[key] || import.meta.env[key] || ''

const active = getEnv('VITE_APM_ACTIVE') === 'true'
let apm = null

if (active) {
  apm = initApm({
    serviceName: getEnv('VITE_APM_SERVICE_NAME') || 'frontend',
    serverUrl: getEnv('VITE_APM_SERVER_URL') || 'http://localhost:8200',
    environment: getEnv('VITE_APM_ENVIRONMENT') || 'local',
    serviceVersion: '0.1',
    distributedTracingOrigins: (getEnv('VITE_APM_DISTRIBUTED_TRACING_ORIGINS') || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean),
    logLevel: 'warn',
  })
  
  console.log('✅ Elastic APM initialized:', {
    serviceName: getEnv('VITE_APM_SERVICE_NAME'),
    environment: getEnv('VITE_APM_ENVIRONMENT'),
  })
}

export default apm