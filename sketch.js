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

let blob;

// Load all assets (fonts, images and audio)
function preload() {
	font = loadFont("assets/PatrickHand.ttf");

	bertie = loadImage("assets/bertie.png");
	congratulations = loadImage("assets/congratulations.png");

	blob = loadImage("assets/blob.png");

	soundFormats("wav", "mp3");
	victorySound = loadSound("assets/victory.wav");
	atmoSound = loadSound("assets/atmo.mp3");
}

// Setup canvas and bertie
function setup() {
	// Display block in order to prevent scrollbar
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style("display", "block");

	// Resize all image beforehand
	bertie.resize(100, 0);
	congratulations.resize(0, windowHeight);

	blob.resize(150, 0);

	// Pick a random position for Bertie to spawn in
	x = random(0, windowWidth - bertie.width);
	y = random(0, windowHeight - bertie.height);
}

// Keep canvas fullscreen even when resizing window
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	// Game start
	if (!playing) playing = true;
	else {
		// Game reset (try again)
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

	// Alternatively you can click on bertie to win instead of waiting with the cursor in the perimeter.
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
		// Starting screen, appears only once
		background(256);

		textFont(font);
		textAlign(CENTER, CENTER);
		textSize(48);
		text("Click anywhere to start.", windowWidth / 2, windowHeight / 2);
	} else {
		if (!victory) {
			// Main game loop
			background(0);

			// Ambient atmosphere sounds for extra emotions ;)
			if (!atmoSoundPlayed) atmoSound.loop();
			atmoSoundPlayed = true;

			// Draw flashlight and bertie
			// ellipse(mouseX, mouseY, 150, 150);
			imageMode(CENTER);
			image(blob, mouseX, mouseY);

			imageMode(CORNER);
			image(bertie, x, y);

			// Calculate if cursor is in perimeter and add score to win
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
				// Victory screen
				background(256);

				imageMode(CENTER);
				image(congratulations, windowWidth / 2, windowHeight / 2);

				// Pause atmo sound because you won \o/
				if (!atmoSoundPaused) atmoSound.pause();
				atmoSoundPaused = true;

				if (!victorySoundPlayed) victorySound.play();
				victorySoundPlayed = true;

				// Try again screen appears after 4 seconds
				if (!timedOut) {
					setTimeout(() => {
						tryAgain = true;
					}, 4000);
				}
				timedOut = true;
			} else {
				// Try again screen
				background(256);

				// Resume the atmo sound, back in the ambience soup
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
