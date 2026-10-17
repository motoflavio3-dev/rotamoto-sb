importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB9SAYR3jMCRQ1cmKWRqgsZt2PI1FGkiYw",
  authDomain: "rota-moto-sao-borja.firebaseapp.com",
  projectId: "rota-moto-sao-borja",
  storageBucket: "rota-moto-sao-borja.firebasestorage.app",
  messagingSenderId: "31831243348",
  appId: "1:31831243348:web:bbd148e0b11db4f6b44bc1",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || {};
  self.registration.showNotification(data.title || "Nova corrida disponível", {
    body: data.body || "Abra o Rota Moto para ver os detalhes.",
    data: { url: data.url || self.registration.scope },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || self.registration.scope;
  event.waitUntil((async () => {
    const windows = await clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if ("focus" in client) {
        await client.navigate(target);
        return client.focus();
      }
    }
    return clients.openWindow(target);
  })());
});
