export default function manifest() {
    return {
      name: 'Yawmy',
      short_name: 'Yawmy',
      description: 'Yawmy is a platform for managing your daily activities.',
      start_url: '/',
      display: 'standalone',
      background_color: '#FFF4E0',
      theme_color: '#FFF4E0',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }