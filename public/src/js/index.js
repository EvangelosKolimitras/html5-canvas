var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canvas = document.querySelector("#canvas");
var w = {
    width: window.innerWidth,
    height: window.innerHeight,
    mouse: {
        x: undefined,
        y: undefined,
    },
    colors: ["red", "blue", "orange", "pink", "purple", "yellow", "green"],
};
var c = canvas.getContext("2d");
window.addEventListener("mousemove", function (e) {
    w.mouse.x = e.x;
    w.mouse.y = e.y;
});
window.addEventListener("resize", function () {
    canvas.width = w.width;
    canvas.height = w.height;
    init();
});
window.addEventListener("load", function () {
    canvas.width = w.width;
    canvas.height = w.height;
});
var maxRadius = 50;
var Shape = /** @class */ (function () {
    function Shape(_x, _y, _dx, _dy) {
        this.x = _x;
        this.y = _y;
        this.dx = _dx;
        this.dy = _dy;
        this.color = w.colors[Math.floor(Math.random() * w.colors.length)];
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(_x, _y, _dx, _dy, _r) {
        var _this = _super.call(this, _x, _y, _dx, _dy) || this;
        _this.draw = function () {
            c.beginPath();
            c.arc(_this.x, _this.y, _this.r, 0, 2 * Math.PI, false);
            c.fill();
            c.fillStyle = _this.color;
        };
        _this.update = function () {
            if (_this.x + _this.r > w.width || _this.x - _this.r < 0)
                _this.dx = _this.dx * -1;
            _this.x += _this.dx;
            if (_this.y + _this.r > w.height || _this.y - _this.r < 0)
                _this.dy = -_this.dy;
            _this.y += _this.dy;
            _this.x += _this.dx;
            _this.y += _this.dy;
            if (w.mouse.x - _this.x < 100 &&
                w.mouse.x - _this.x > -100 &&
                w.mouse.y - _this.y < 100 &&
                w.mouse.y - _this.y > -100) {
                if (_this.r < maxRadius) {
                    _this.r += 1;
                }
            }
            else if (_this.r > _this.minR) {
                _this.r -= 1;
            }
            _this.draw();
        };
        _this.r = _r;
        _this.minR = _r;
        return _this;
    }
    return Circle;
}(Shape));
var circlesArray = [];
var init = function () {
    var speed = 5;
    circlesArray = [];
    for (var i = 0; i < 500; i++) {
        var circle = [
            Math.random() * (w.width - 40 * 2) + 40,
            Math.random() * (w.height - 40 * 2) + 40,
            (Math.random() - 0.5) * speed,
            (Math.random() - 0.5) * speed,
            Math.random() * 3 + 1,
        ];
        circlesArray.push(new (Circle.bind.apply(Circle, __spreadArrays([void 0], circle)))());
    }
};
var animate = function () {
    c.clearRect(0, 0, w.width, w.height);
    requestAnimationFrame(animate);
    for (var i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update();
    }
};
animate();
init();
