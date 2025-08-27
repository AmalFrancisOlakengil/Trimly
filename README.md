# 🎬 Trimly

Trimly is a lightweight, browser-based video trimming and quality adjustment tool built with **React** and **FFmpeg.wasm**.  
Easily trim videos, adjust quality, and export clips — all directly in your browser, with no installations required.  

---

## 🔗 Links

- 🔥 **Live Demo:** [[demo link here](https://trimly-nine.vercel.app/)]
- 🎥 **Demo Video:** [[video link here](https://www.youtube.com/watch?v=rekRw8oo5J4)]

---

## ✨ Features

- 📂 **Upload Videos** from your device
- ✂️ **Trim Videos** easily with start/end time controls
- ⚡ **Adjust Quality** with a bitrate slider
- 🖥️ **In-Browser Processing** with `ffmpeg.wasm`
- 🔒 **Privacy First:** Videos never leave your machine

---

## 🚀 Getting Started

Follow these steps to run Trimly locally:

### 1. Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/trimly.git
cd trimly
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Run the Development Server
```bash
npm run dev
```
Visit **http://localhost:3000** in your browser to use Trimly locally.

---

## 📂 Project Structure
```
src/
 ├── app/
 │   ├── page.tsx          -> Landing page
 │   ├── editor/
 │   │   └── page.tsx      -> Video editor UI
 │   └── globals.css       -> Tailwind styles
 ├── components/
 │   ├── FileUploader.tsx
 │   ├── VideoPlayer.tsx
 │   ├── TrimControls.tsx
```

---

## 🧩 How It Works
1. Upload a video from your device.  
2. Set the **start** and **end** time for trimming.  
3. Adjust the **bitrate** to control video quality.  
4. Click **Trim Video** to process and download your clip.  

---

## 🛡️ Privacy
All processing is done **locally** in your browser using WebAssembly.  
Your files are **never uploaded** to a server.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** this repository.
2. Create a **new branch** for your feature/fix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and **commit**:
   ```bash
   git commit -m "Add some feature"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a **Pull Request** and describe your changes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

### 🌟 Star this repo if you find it useful!
