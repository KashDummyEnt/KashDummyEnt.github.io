// =========================
// RESPONSIVE SNOW SYSTEM (FIXED)
// =========================

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
let lastTime = 0;

// =========================
// SETTINGS (dynamic)
// =========================

function getSettings()
{
	const isMobile = window.innerWidth < 768;

	return {
		count: isMobile ? 35 : 70,
		fps: isMobile ? 30 : 60,
		scale: isMobile ? 0.6 : 1
	};
}

// =========================
// RESIZE
// =========================

function resizeCanvas()
{
	const SETTINGS = getSettings();
	const scale = SETTINGS.scale;

	// internal resolution (performance)
	canvas.width = window.innerWidth * scale;
	canvas.height = window.innerHeight * scale;

	// visual size
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";

	// reset transform
	ctx.setTransform(1, 0, 0, 1, 0, 0);

	// apply scale
	ctx.scale(scale, scale);

	createSnowflakes();
}

window.addEventListener("resize", resizeCanvas);

// =========================
// CREATE SNOWFLAKES
// =========================

function createSnowflakes()
{
	const SETTINGS = getSettings();

	snowflakes = [];

	for (let i = 0; i < SETTINGS.count; i++)
	{
		snowflakes.push({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			radius: Math.random() * 2 + 0.8,
			speedY: Math.random() * 1 + 0.4,
			speedX: Math.random() * 0.6 - 0.3
		});
	}
}

// =========================
// UPDATE LOOP
// =========================

function updateSnow(time)
{
	const SETTINGS = getSettings();
	const interval = 1000 / SETTINGS.fps;

	if (time - lastTime < interval)
	{
		requestAnimationFrame(updateSnow);
		return;
	}

	lastTime = time;

	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

	ctx.fillStyle = "white";

	for (let flake of snowflakes)
	{
		flake.y += flake.speedY;
		flake.x += flake.speedX;

		// reset vertically
		if (flake.y > window.innerHeight)
		{
			flake.y = -5;
			flake.x = Math.random() * window.innerWidth;
		}

		// wrap horizontally
		if (flake.x > window.innerWidth) flake.x = 0;
		if (flake.x < 0) flake.x = window.innerWidth;

		ctx.beginPath();
		ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	requestAnimationFrame(updateSnow);
}

// =========================
// INIT
// =========================

resizeCanvas();
requestAnimationFrame(updateSnow);
