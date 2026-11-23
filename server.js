import express from "express";
import httpModule from "http"; // importing built in http tool box, we don't have to install this, this is already given in node.js
import { Server } from "socket.io";
import path from "path";
import QRCode from "qrcode";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
// our http is like a bouncer in the nighclub who stops every person  who walks to the building.
const http = httpModule.Server(app); // server() is the ear it just listen for the request but this app is the brain it knows what to do when this specific request arrives so, ear and brain work in co-poration.
const io = new Server(http); // now socket.io piggybacks on our bouncer.
const port = process.env.PORT || 8080;
let activePlayers = [];
let isGameStarted = false;
let playersNum = 0;
// http is a bouncer
// app is the VIP manager
// io is sitting on the bouncer's shoulders.

app.use(express.static("public"));
app.set("trust proxy", 1);

http.listen(port, () => {
  console.log(`Hey, the server is started on port: ${port}`);
});
io.on("connection", (socket) => {
  // this socket is the divice that has just got connected.
  console.log(`A new divice connected.`);
  socket.on("key_pressed", (keyData) => {
    // this means that this callback will only run if remote phone send the data with the named key_pressed, and the keyData is the actuall data the phone is sending.

    // 2. The Server throws the ball to the PC
    // 'broadcast' is an industry standard: it sends the data to EVERYONE connected to the server *except* the person who just sent it. This means the server is sending this data to everyone expect the one who has handed us this keyData.
    socket.broadcast.emit("player_input", keyData);
  });
    socket.on("trigger_haptic", (payload) => {
      socket.broadcast.emit("vibrate_controller", payload);
    });
  socket.on("players_Num", (playersNumber) => {
    playersNum = playersNumber;
  });
  socket.on("player_joined", (username) => {
    socket.username = username;
    if (activePlayers.length < playersNum) {
      activePlayers.push(username);
      io.emit("update_lobby", activePlayers); // this io.emit shouts this activePlayers to all the divice which is connected including the phone. but in socket.emit the server only shouts to the phone who is currently connected.
    } else {
      socket.emit("lobby_full");
    }
  });
  socket.on("disconnect", () => {
    if (isGameStarted === false) {
      console.log(`${socket.username} disconnected`);
      let index = activePlayers.indexOf(socket.username);
      if (index !== -1) {
        activePlayers.splice(index, 1);
        io.emit("update_lobby", activePlayers);
      }
    }
  });
  socket.on("get_active_players", () => {
    socket.emit("active_players", activePlayers);
  });
  socket.on("game_started", () => {
    isGameStarted = true;
    io.emit("launch_controller");
  });
});

// routes
app.get("/zMath", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "zMath.html"));
});
app.get("/controller", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "controller.html"));
});
app.get(["/", "/home"], (req, res, next) => {
  res.sendFile(path.join(process.cwd(), "views", "home.html"));
});
app.get("/lobby", (req, res) => {
  isGameStarted = false;
  activePlayers = [];
  res.sendFile(path.join(process.cwd(), "views", "lobby.html"));
});
app.get("/join", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "join.html"));
});
app.get("/api/get-qr", async (req, res) => {
  try {
    const host = req.get("host");
    const protocol = req.protocol;
    const url = `${protocol}://${host}/join`;
    let Base64 = await QRCode.toDataURL(url);
    res.json({ Base64, url });
  } catch (error) {
    console.error("QR Code generation error:", error);
    res.status(500).json({ error: "Failed to generate QR Code" });
  }
});
