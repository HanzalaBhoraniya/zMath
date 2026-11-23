# 🚀 ZMath — Real-Time Multiplayer Arcade Math Game

<table>
  <tr>
    <td rowspan="2" width="33%" align="center" valign="middle">
      <img src="https://github.com/user-attachments/assets/8399e8d1-212f-433f-b0f2-7ab6088e9a97" alt="ZMath Mobile Uplink" />
    </td>
    <td width="67%" align="center" valign="middle">
      <img src="https://github.com/user-attachments/assets/b2f5cf95-f69b-400b-b1ab-5ecc0c689643" alt="ZMath Game Modes" />
    </td>
  </tr>
  <tr>
    <td width="67%" align="center" valign="middle">
      <img src="https://github.com/user-attachments/assets/0e07e845-80b6-47fe-b14f-3d33f041630a" alt="ZMath Arena Gameplay" />
    </td>
  </tr>
</table>

> A real-time, WebSocket-powered arcade math defense game where players turn their smartphones into wireless haptic controllers to battle on a shared PC screen.

## 🌐 Live Demo

[View the Live Project Here](https://zmath.onrender.com)

## 📖 About This Project

ZMath reimagines classic browser math games into a shared, Jackbox-style couch-arcade experience. Players launch a match on a PC screen, scan a dynamically generated QR code with their smartphones, and race against each other in real time to solve falling equations before they breach the firewall. Built with an event-driven Node.js + Socket.IO architecture, every keystroke, score update, and haptic vibration is synchronized across devices with near-zero latency.

## 🛠️ Tech Stack

**Frontend:**
* HTML5 `<canvas>` (Custom 60fps `requestAnimationFrame` game loop & collision engine)
* Vanilla JavaScript (ES6+ modular client architecture)
* CSS3 (Custom tileable SVG circuit-board theme, responsive flexbox/grid layouts)
* Web Audio & Vibration APIs (`navigator.vibrate()` mobile haptic feedback & arcade SFX)

**Backend & Real-Time Engine:**
* Node.js (ES Modules) & Express.js
* Socket.IO (Bidirectional low-latency WebSocket rooms & event broadcasting)
* `qrcode` (Dynamic server-side QR code generation for instant mobile pairing)

## ✨ Key Features

* **Dual Game Modes (Solo & Local Co-Op Arena):** Play single-player on a PC keyboard or host a 2-to-4 player live arena using smartphones as wireless controllers.
* **Instant QR Code Lobby Pairing:** Dynamically generates a scannable QR code and join URL on the host screen so players connect in seconds without typing IP addresses.
* **Real-Time Multi-Lane Arcade Typing:** Streams every phone keypad tap (`0–9`, `-`, `Del`, `Enter`) directly into each player's dedicated on-screen lane in real time.
* **Mobile Haptic Force Feedback:** Triggers distinct controller vibrations on players' phones (`navigator.vibrate`) for confirmed hits and missed shots.
* **Adaptive Difficulty & Procedural Equations:** Dynamically increases block speed and unlocks addition, subtraction, multiplication, division, and negative integers as levels progress.
* **Live Leaderboard & Winner Detection:** Tracks individual scores per lane, crowns the top operator on Game Over, and persists all-time solo high scores in `localStorage`.

## 🔮 What's Coming in V2

* **Single-Player Mobile Controller Mode:** Play solo on the big PC screen while using your smartphone as a dedicated wireless haptic keypad.
* **Unlimited-Player Multiplayer:** Remove the 4-player lobby cap so an unlimited number of players can join a single room and compete simultaneously.
* **Next-Level UI & UX Overhaul:** Complete visual and interaction upgrade featuring enhanced animations, sound design, and polished arena feedback.

## 💻 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/HanzalaBhoraniya/zMath.git](https://github.com/HanzalaBhoraniya/zMath.git)
   ```

2. **Navigate to the project directory and install dependencies:**
   ```bash
   cd zMath
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in your browser:**
   Visit `http://localhost:1234` on your PC. *(To test mobile pairing locally on the same Wi-Fi, open `/join` in a second browser tab or use your machine's local network IP.)*
