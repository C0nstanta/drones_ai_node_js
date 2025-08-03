module.exports = {
  apps: [{
    name: 'adaptiveautohub',
    script: './.next/standalone/server.js',
    cwd: '/home/kos/drone_ai_node_v1',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    merge_logs: true,
    time: true,
    autorestart: true,
    max_memory_restart: '1G',
    watch: false
  }]
};
