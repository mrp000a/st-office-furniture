self.addEventListener("push", (event) => {
    if (!event.data) return;

    const data = event.data.json();

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.icon || "/icons/icon-192.jpg",
            badge: data.badge || "/badge-72.png",
            image: data.image,
            data: {
                url: data.url || "/",
            },
        })
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "/";

    event.waitUntil(
        clients.openWindow(url)
    );
});