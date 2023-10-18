module.exports = {
    apps: [
        {
            name: 'movies_api_nubceo',
            script: './src/index.js',
            instaces: 'max',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}