const canvas = document.querySelector("#canvas")
const w = {
    width: window.innerWidth,
    height: window.innerHeight,
}
canvas.width = w.width
canvas.height = w.height

class Shape {
    constructor(x, y, dx, dy, r) {
        this.c = canvas.getContext('2d')
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
        this.c.clearRect(0, 0, w.width, w.height)
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
        this.c.stroke()
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
const circles = [Math.floor(Math.random() * w.width), Math.floor(Math.random() * w.height), (Math.random() - .5) * 5, (Math.random() - .5) * 5]
for (let i = 0; i <= 20; i++) {
    circlesArray.push(new Circle(...circles, 40))
}
const animate = () => {
    requestAnimationFrame(animate)
    for (let i = 0; i <= circlesArray.length; i++) {
        circlesArray[i].update()
    }
}

animate()