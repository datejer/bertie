let playing = false;
let font;
let bertie;
let congratulations;
let x, y;
let score = 0;
let victory = false;
let victorySound;
let atmoSound;
let victorySoundPlayed = false;
let atmoSoundPlayed = false;
let atmoSoundPaused = false;
let tryAgain = false;
let timedOut = false;

let bertieCenterX;
let bertieCenterY;

function preload() {
	font = loadFont("assets/PatrickHand.ttf");

	bertie = loadImage("assets/bertie.png");
	congratulations = loadImage("assets/congratulations.png");

	soundFormats("wav", "mp3");
	victorySound = loadSound("assets/victory.wav");
	atmoSound = loadSound("assets/atmo.mp3");
}

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style("display", "block");

	bertie.resize(100, 0);
	congratulations.resize(0, windowHeight);

	x = random(0, windowWidth - bertie.width);
	y = random(0, windowHeight - bertie.height);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	if (!playing) playing = true;
	else {
		if (tryAgain) {
			playing = true;
			victory = false;
			victorySoundPlayed = false;
			atmoSoundPlayed = false;
			atmoSoundPaused = false;
			tryAgain = false;
			timedOut = false;
			score = 0;
			x = random(0, windowWidth - bertie.width);
			y = random(0, windowHeight - bertie.height);
			atmoSound.pause();
		}
	}

	if (
		mouseX - bertieCenterX > -75 &&
		mouseX - bertieCenterX < 75 &&
		mouseY - bertieCenterY > -50 &&
		mouseY - bertieCenterY < 50
	)
		score = 100;
}

function draw() {
	if (!playing) {
		background(256);

		textFont(font);
		textAlign(CENTER, CENTER);
		textSize(48);
		text("Click anywhere to start.", windowWidth / 2, windowHeight / 2);
	} else {
		if (!victory) {
			background(0);

			if (!atmoSoundPlayed) atmoSound.loop();
			atmoSoundPlayed = true;

			ellipse(mouseX, mouseY, 150, 150);

			image(bertie, x, y);

			bertieCenterX = x + bertie.width / 2;
			bertieCenterY = y + bertie.height / 2;

			if (
				mouseX - bertieCenterX > -75 &&
				mouseX - bertieCenterX < 75 &&
				mouseY - bertieCenterY > -50 &&
				mouseY - bertieCenterY < 50
			)
				score++;

			if (score > 50) victory = true;
		} else {
			if (!tryAgain) {
				background(256);

				imageMode(CENTER);
				image(congratulations, windowWidth / 2, windowHeight / 2);

				if (!atmoSoundPaused) atmoSound.pause();
				atmoSoundPaused = true;

				if (!victorySoundPlayed) victorySound.play();
				victorySoundPlayed = true;

				if (!timedOut) {
					setTimeout(() => {
						tryAgain = true;
					}, 4000);
				}
				timedOut = true;
			} else {
				background(256);

				if (atmoSoundPlayed) atmoSound.loop();
				atmoSoundPlayed = false;

				textFont(font);
				textAlign(CENTER, CENTER);
				textSize(48);
				text("Try again?", windowWidth / 2, windowHeight / 2);

				textAlign(CENTER, BOTTOM);
				textSize(24);
				text("Made by ejer in p5.js", windowWidth / 2, windowHeight);
			}
		}
	}
}
