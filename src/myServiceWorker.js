export default function myServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(function(reg) {
        console.log("Service Worker Registered", reg);
      })
      .catch(function(error) {
        console.log("Registration failed" + error);
      });
  }
}
