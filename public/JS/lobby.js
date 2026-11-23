const socket = io()
const waitingForPlayers = document.getElementById("waitingForPlayers")
const qrCodeImage = document.querySelector("#qrCodeImage img")
const startBtn = document.querySelector("#startBtnBox a")
const urlPara = document.getElementById("url")
const intructionBox = document.getElementById("instructionBox")
// getting that players number from the query string.
const playersNum = Number(new URLSearchParams(window.location.search).get("players"))
intructionBox.innerText = `AWAITING ${playersNum} OPERATORS TO INITIALIZE...`;
let startBtnVisible = false
startBtn.classList.add("displayNone")
// "Wait until the phone call connects, THEN tell the server the limit is 2!"
socket.on("connect", () => {
    socket.emit("players_Num", playersNum)
})
// for loop to create that rectangle boxes.
for (let i = 1; i <= playersNum; i++) {
    let newDiv = document.createElement("div")
    newDiv.classList.add("players")
    newDiv.innerText = `Waiting for the player ${i}...`
    waitingForPlayers.appendChild(newDiv)
}
const playersArr = document.querySelectorAll(".players")
const loadQR = async () => {
    let url = `/api/get-qr`;
    let result = (await (await fetch(url)).text())
    let jsObject = JSON.parse(result)
    urlPara.innerText = `Or go to this: ${jsObject.url}`
    console.log(jsObject)
    qrCodeImage.src = jsObject.Base64;
}
loadQR()
socket.on("update_lobby", (activePlayers) => {
    for (let i = 0; i < playersArr.length; i++) {
        if (activePlayers[ i ]) {
            playersArr[i].innerHTML = `> [P${i+1}] UPLINK_STABLISHED: ${activePlayers[i]}`
        } else { // if there is nothing on that index in activePlayers again rewrite our old text.
            playersArr[i].innerHTML = `Waiting for the player ${i + 1}...`;
        }
    }
    let reaminingPlayers = playersNum - activePlayers.length
    if (reaminingPlayers !== 0) {
        intructionBox.innerText = `AWAITING ${reaminingPlayers} OPERATORS TO INITIALIZE...`;
        startBtn.classList.add("displayNone")
    } else {
        intructionBox.innerText = `All Players have joined start the game.`
        startBtnVisible = true;
        startBtn.classList.remove("displayNone")
    }
})
startBtn.addEventListener("click", (event) => {
    event.preventDefault()
    socket.emit("game_started")
    window.location.href = `/zMath?mode=multi`
})