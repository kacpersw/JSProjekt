
window.addEventListener("DOMContentLoaded", game);

var sprite = new Image();
sprite.src = document.location.href + '/../photos.png';

function game() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d"),
        WIDTH = ctx.canvas.height = 900,
        HEIGHT = ctx.canvas.width = 900;

    var bullets = [],
        playing = true,
        destroyedBullets = 0,
        destroyedAsteroids = 0,
        asteroids = [];

    var gun = {
        x: canvas.width / 2,
        y: canvas.height - 10,
        r: 39.5,
        w: 70,
        speedMove: 10,
        speedShot: 400,
        update: function () {
            if (pressed[39] && this.x < WIDTH - 60) this.x += 10;
            if (pressed[37] && this.x > 0) this.x -= 10;
        },
        shot: function () {
            if (pressed[32]) {
                action();
            }
        }
    };

    var pressed = {};

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
                update: function () {
                    this.y -= 40;
                }
            };
            bullets.push(bullet);
        }
    }

    function update() {
        ctx.clearRect(0, 815, canvas.width, 85);
        gun.update();
        ctx.drawImage(
            sprite,
            200,
            0,
            70,
            79,
            gun.x,
            gun.y - 79,
            70,
            79
        );
    }

    var gunSpeedTimer = setInterval(update, gun.speedMove);
    var gunShotTimer = setInterval(gun.shot, gun.speedShot);

    function fire() {
        if (playing && bullets.length - destroyedBullets) {
            for (var i = 0; i < bullets.length; i++) {
                if (!bullets[i].destroyed) {
                    bullets[i].update();
                    //bullets[i].draw();
                    ctx.drawImage(
                        sprite,
                        211,
                        100,
                        50,
                        75,
                        bullets[i].x + 27,
                        bullets[i].y -= 0.5,
                        19,
                        30
                    );
                }
            }
        }
    }

    function newAsteroid() {

        var coordsX = random(0, WIDTH - 150),
            coordsY = 0;

        var asteroid = {
            x: 278,
            y: 0,
            state: 0,
            stateX: 0,
            width: 134,
            height: 123,
            realX: coordsX,
            realY: coordsY,
            moveY: 0,
            coordsX: coordsX,
            coordsY: coordsY,
            size: random(1, 3),
            deg: Math.atan2(coordsX - (WIDTH / 2), -(coordsY - (HEIGHT / 2))),
            destroyed: false
        };
        asteroids.push(asteroid);
    }
    function _asteroids() {
        var distance;

        for (var i = 0; i < asteroids.length; i++) {
            if (!asteroids[i].destroyed) {
                ctx.save();
                ctx.translate(asteroids[i].coordsX, asteroids[i].coordsY);

                ctx.drawImage(
                    sprite,
                    asteroids[i].x,
                    asteroids[i].y,
                    asteroids[i].width,
                    asteroids[i].height,
                    asteroids[i].realX,
                    asteroids[i].moveY += 0.5,
                    asteroids[i].width / asteroids[i].size,
                    asteroids[i].height / asteroids[i].size
                );

                ctx.restore();

            }

        }

        if (asteroids.length - destroyedAsteroids < 10 + (Math.floor(destroyedAsteroids / 10))) {
            newAsteroid();
        }
    }

    window.requestAnimationFrame(init);

    function init() {
        ctx.clearRect(0, 0, canvas.width, HEIGHT - 85);
        update();
        fire();
        if (playing) {
            _asteroids();
        }
        window.requestAnimationFrame(init);
    }

    init();
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}
