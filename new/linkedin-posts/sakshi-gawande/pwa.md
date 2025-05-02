If you're building a website, make it a PWA with Service Workers.

Ever wondered how some websites work even without the internet? Or how web apps send notifications like mobile apps?

𝗪𝗵𝗮𝘁 𝗶𝘀 𝗮 𝗦𝗲𝗿𝘃𝗶𝗰𝗲 𝗪𝗼𝗿𝗸𝗲𝗿?

A Service Worker is a script that runs in the background, separate from the main browser thread. Unlike regular JavaScript, which is single-threaded (meaning it executes code sequentially), Service Workers operate in a different thread. This allows them to handle tasks asynchronously without blocking the main UI.

𝗛𝗼𝘄 𝗗𝗼𝗲𝘀 𝗜𝘁 𝗪𝗼𝗿𝗸?

Think of a Service Worker as a middleman between your browser and the network

1. Installs and caches important files on the first visit.
2. Intercepts requests and serves files from the cache (for instant loading).
3. If an update is available, it fetches fresh data from the network.

𝗪𝗵𝗮𝘁 𝗖𝗮𝗻 𝗦𝗲𝗿𝘃𝗶𝗰𝗲 𝗪𝗼𝗿𝗸𝗲𝗿𝘀 𝗗𝗼?

1. Offline access – Loads pages even when there's no internet.
2. Faster performance – Saves important files so they don’t reload every time.
3. Push notifications – Sends alerts like a native app.

some useful resources:

- https://lnkd.in/dxfqGDCU
- https://lnkd.in/dxauygKw

## If you’ve read this far—keep learning, Keep mastering.

I’m working on handling UI changes based on whether my Next.js app is running as a standard web app or an installed PWA on Android (or other platforms).

Here are some methods I know:

𝗨𝘀𝗲𝗿 𝗔𝗴𝗲𝗻𝘁 𝗗𝗲𝘁𝗲𝗰𝘁𝗶𝗼𝗻 – Quick but unreliable due to spoofing
𝘄𝗶𝗻𝗱𝗼𝘄.𝗺𝗮𝘁𝗰𝗵𝗠𝗲𝗱𝗶𝗮('(𝗱𝗶𝘀𝗽𝗹𝗮𝘆-𝗺𝗼𝗱𝗲: 𝘀𝘁𝗮𝗻𝗱𝗮𝗹𝗼𝗻𝗲)') – Best for detecting PWA mode
𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗶𝘃𝗲 𝗨𝗜 (𝘄𝗶𝗻𝗱𝗼𝘄.𝗶𝗻𝗻𝗲𝗿𝗪𝗶𝗱𝘁𝗵) – Works well for mobile-first design

Are there any better approaches or best practices to make UI adaptation more reliable? I’d love to hear your thoughts
