// =========================
// OPTIMIZED SNOW SYSTEM
// =========================

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];

const isMobile = window.innerWidth < 768;

// performance settings
const SETTINGS =
{
	count: isMobile ? 35 : 70,
	fps: isMobile ? 30 : 60,
	scale: isMobile ? 0.6 : 1 // lower resolution on mobile
};

let lastTime = 0;

// =========================
// RESIZE
// =========================

function resizeCanvas()
{
	const scale = SETTINGS.scale;

	canvas.width = window.innerWidth * scale;
	canvas.height = window.innerHeight * scale;

	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";

	ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

window.addEventListener("resize", () =>
{
	resizeCanvas();
	createSnowflakes();
});

resizeCanvas();

// =========================
// CREATE SNOWFLAKES
// =========================

function createSnowflakes()
{
	snowflakes = [];

	for (let i = 0; i < SETTINGS.count; i++)
	{
		snowflakes.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
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
	const interval = 1000 / SETTINGS.fps;

	if (time - lastTime < interval)
	{
		requestAnimationFrame(updateSnow);
		return;
	}

	lastTime = time;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "white";

	for (let flake of snowflakes)
	{
		flake.y += flake.speedY;
		flake.x += flake.speedX;

		// reset when off screen
		if (flake.y > canvas.height)
		{
			flake.y = -5;
			flake.x = Math.random() * canvas.width;
		}

		// slight horizontal wrap (prevents clustering)
		if (flake.x > canvas.width) flake.x = 0;
		if (flake.x < 0) flake.x = canvas.width;

		ctx.beginPath();
		ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	requestAnimationFrame(updateSnow);
}

// =========================
// INIT
// =========================

createSnowflakes();
requestAnimationFrame(updateSnow);
