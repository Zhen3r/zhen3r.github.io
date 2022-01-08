var canvasDiv = document.getElementById('p5');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;

var words = ["Data Analyst", "Programmer", "Designer"];
var points;
var vehicles = [];
let font;
let wordIndex = -1;
let t;

function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 2.5;
    this.maxspeed = 15;
    this.maxforce = .8;
    this.h = 360;
    this.sat = 70;
    this.light = 100;
    this.opa = 1;
    // this.c = color('hsb('+this.h+',70%,70%)');


    this.behaviors = function () {
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    this.applyForce = function (f) {
        this.acc.add(f);
    }

    this.update = function () {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.h = floor(map(this.vel.x, .1, this.maxspeed - 1, 220, 360));
        this.sat = floor(map(this.vel.x, .1, this.maxspeed - 1, 60, 80));
        this.light = floor(map(this.vel.x, .001, .1, 100, 50));

        // this.opa = map(this.vel.x,0,3,0,5);

        if (this.h < 0) {
            this.h = 0;
        }
        if (this.sat < 70) {
            this.sat = 70;
        }
        if (this.light < 50) {
            this.light = 50;
        }
        if (this.opa < 0) {
            this.opa = 0;
        }
        this.acc.mult(0);

    }

    this.show = function () {
        push();
        // this.h++;
        var c = color('hsla(' + this.h + ',' + this.sat + '%,' + this.light + '%,' + this.opa + ')');
        stroke(c);
        strokeWeight(this.r);
        point(this.pos.x, this.pos.y);
        pop();
    }


    this.arrive = function (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        var speed = this.maxspeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    this.flee = function (target) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        if (d < 50) {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

}

function changeWord() {
    points = []
    vehicles = []
    wordIndex += 1;
    fs = 100;
    if (wordIndex >= words.length) { wordIndex -= words.length }
    let word = words[wordIndex];
    let bbox = font.textBounds(word, width / 2, height / 2, fs);
    if (bbox.w > width) {
        fs = fs / (bbox.w / width) * 0.9
        bbox = font.textBounds(word, width / 2, height / 2, fs);
    }

    circle(width / 2 - bbox.w / 2, height * 0.5, 10)

    // noLoop()
    points = font.textToPoints(word, width / 2 - bbox.w / 2, height * 0.5 + bbox.h * 0.27, fs, {
        sampleFactor: .2,
        simplifyThreshold: 0
    });


    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}



function preload() {
    font = loadFont('res/open sans.ttf');
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('p5');
    background("#141C2E");
    changeWord();
    t = millis() / 1000;
}

function draw() {
    background("#141C2E");
    // background("#000")

    t_ = millis() / 1000
    if (t_ - t > 5) {
        changeWord()
        t = t_;
    }
    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }

}
