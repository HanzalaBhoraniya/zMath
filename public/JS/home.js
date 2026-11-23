const singlePlayerBtn = document.getElementById("keyboard")
const twoPlayerBtn = document.getElementById("twoPlayers")
const threePlayerBtn = document.getElementById("threePlayers")
const fourPlayerBtn = document.getElementById("fourPlayers")

// addEventListner
singlePlayerBtn.addEventListener("click", (event) => {
    window.location.href = "/zMath?mode=solo"
})
twoPlayerBtn.addEventListener("click", (event) => {
    window.location.href = "/lobby?players=2"
})
threePlayerBtn.addEventListener("click", (event) => {
    window.location.href = "/lobby?players=3"
})
fourPlayerBtn.addEventListener("click", (event) => {
    window.location.href = "/lobby?players=4"
})