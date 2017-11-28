
window.addEventListener("DOMContentLoaded", game);

var sprite = new Image();
sprite.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/600764/sprite.png';

function game() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d"),
        WIDTH = ctx.canvas.height = 900,
        HEIGHT = ctx.canvas.width = 900;

    var bullets = [],
        playing = true,
        destroyedBullets = 0;

    var gun = {
        x: canvas.width / 2,
        y: canvas.height - 10,
        r: 6,
        w: 55,
        speedMove: 10,
        speedShot: 150,
        draw: function () {
            ctx.strokeStyle = "Black";
            ctx.fillStyle = "RoyalBlue";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x - this.w / 2, this.y - this.r);
            ctx.lineTo(this.x + this.w / 2, this.y - this.r);
            ctx.arc(this.x + this.w / 2, this.y, this.r,
                -0.5 * Math.PI, 0.5 * Math.PI);
            ctx.lineTo(this.x - this.w / 2, this.y + this.r);
            ctx.arc(this.x - this.w / 2, this.y, this.r,
                0.5 * Math.PI, 1.5 * Math.PI);
            ctx.fill();
            ctx.stroke();
        },
        update: function () {
            if (pressed[39] && this.x < WIDTH - 10) this.x += 10;
            if (pressed[37] && this.x > 10) this.x -= 10;
        },
        shot: function(){
            if (pressed[32]) {
                action();
            }
        }
    };

    var pressed = {};

    gun.draw();

    $("body").keydown(function (e) {
        e = e || window.event;
        pressed[e.keyCode] = true;
    });

    $("body").keyup(function (e) {
        e = e || window.event;
        delete pressed[e.keyCode];
    });

    function action() {
        if (playing) {
            var bullet = {
                x: gun.x,
                y: gun.y - 10,
                // promień
                r: 10,
                draw: function () {
                    // rysujemy
                    ctx.strokeStyle = "Black";
                    ctx.fillStyle = "Yellow";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                },
                update: function () {
                    this.y -= 40;
                }
            };
            gun.draw();
            bullets.push(bullet);
        }
    }

    function update(){
        ctx.clearRect(0, 880, canvas.width, 20);
        gun.update();
        gun.draw();
    }

    var gunSpeedTimer = setInterval(update, gun.speedMove);
    var gunShotTimer = setInterval(gun.shot, gun.speedShot);

    function fire() {
        ctx.clearRect(0, 0, canvas.width, HEIGHT-20);
        if (playing && bullets.length-destroyedBullets) {
            for (var i = 0; i < bullets.length; i++) {
                if (!bullets[i].destroyed) {
                    bullets[i].update();
                    bullets[i].draw();
                }
            }
        }
        window.requestAnimationFrame(fire);
    }
    function init() {
        update();
        fire();
    }

    init();
}
