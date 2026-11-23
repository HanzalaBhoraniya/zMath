const socket = io(); // connecting with switchbord that means our browser request server to upgrade its connection to webSocket.
const waitingMsg = document.getElementById("waitingMessage")
const joinBtn = document.getElementById("joinBtn")
const usernameInput = document.getElementById("usernameInput")
const joinForm = document.getElementById("joinForm")
const lobbyFull = document.getElementById("lobbyFull")
const radarScanner = document.getElementById("radarScanner")

joinBtn.addEventListener("click", (event) => {
    if (usernameInput.value !== "") {
        socket.emit("player_joined", usernameInput.value) // this means users phone is telling server hey, this is my username.
        joinForm.classList.add("displayNone")
        waitingMsg.classList.remove("displayNone")
    }
})
socket.on("launch_controller", () => {
    localStorage.setItem("operatorName", usernameInput.value)
    window.location.href = "/controller"
})
socket.on("lobby_full", () => {
    waitingMsg.classList.add("displayNone")
    radarScanner.classList.add("displayNone")
    joinForm.classList.add("displayNone")
    lobbyFull.classList.remove("displayNone")
})