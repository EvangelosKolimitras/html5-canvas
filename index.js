const canvas = document.querySelector("#canvas")
const w = {
    width: window.innerWidth,
    height: window.innerHeight,
}
canvas.width = w.width
canvas.height = w.height

const c = canvas.getContext('2d')

let x = Math.floor(Math.random() * w.width)
let dx = 10
let y = Math.floor(Math.random() * w.height)
let dy = 10
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)
    c.beginPath()
    c.arc(x, y, 100, 0, 2 * Math.PI, false)
    c.strokeStyle = "red"
    c.stroke()

    // if (x + radius === w.width) x += -dx
    // dx += ((x + 30 <= w.width) && (dx)) || -dx

    if (x + 100 > innerWidth || x - 100 < 0)
        dx = -dx
    x += dx
    if (y + 100 > innerHeight || y - 100 < 0)
        dy = -dy
    y += dy

    // x = ((x < innerWidth) && x + dx) || x + dx * -1
}


animate()