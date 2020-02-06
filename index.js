const canvas = document.querySelector("#canvas")
const w = {
    width: window.innerWidth,
    height: window.innerHeight,
}
canvas.width = w.width
canvas.height = w.height
const c = canvas.getContext('2d')
class Shape {
    constructor(x, y, dx, dy, r) {
        this.x = x;
        this.y = y
        this.dx = dx
        this.dy = dy
        this.r = r
    }
}

class Circle extends Shape {
    constructor(x, y, dx, dy, r) {
        super(x, y, dx, dy, r)
    }
    draw = () => {

        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        c.stroke()
    }

    update = () => {
        if (this.x + this.r > w.width || this.x - this.r < 0)
            this.dx = this.dx * -1
        this.x += this.dx
        if (this.y + this.r > w.height || this.y - this.r < 0)
            this.dy = -this.dy
        this.y += this.dy

        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

const circlesArray = []
for (let i = 0; i < 20; i++) {
    const circle = [
        Math.random() * (w.width - 40 * 2) + 40,
        Math.random() * (w.height - 40 * 2) + 40,
        (Math.random() - .5) * 5,
        (Math.random() - .5) * 5,
        40
    ]
    circlesArray.push(new Circle(...circle))
}
const animate = () => {
    c.clearRect(0, 0, w.width, w.height)
    requestAnimationFrame(animate)
    for (let i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update()
    }
}
console.log(new Circle(1, 2, 3, 4, 10))
animate()