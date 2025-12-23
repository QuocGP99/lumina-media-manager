const { contextBridge } = require("electron");

// Nếu bạn chưa cần API gì từ Electron thì để trống cũng được.
// Mình expose 1 object mẫu để sau này bạn mở rộng.
contextBridge.exposeInMainWorld("lumina", {
  ping: () => "pong",
});
