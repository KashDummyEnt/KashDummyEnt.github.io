// =========================
// SNOW SYSTEM 
// =========================

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
let lastTime = 0;

// =========================
// SETTINGS
// =========================

function getSettings()
{
	const isMobile = window.innerWidth < 768;

	return {
		count: isMobile ? 40 : 80,
		fps: isMobile ? 30 : 60
	};
}

// =========================
// RESIZE
// =========================

function resizeCanvas()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	canvas.style.width = "100%";
	canvas.style.height = "100%";

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
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			radius: Math.random() * 2 + 1,
			speedY: Math.random() * 1 + 0.5,
			speedX: Math.random() * 0.5 - 0.25
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

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "white";

	for (let flake of snowflakes)
	{
		flake.y += flake.speedY;
		flake.x += flake.speedX;

		// reset vertically (random X to prevent stacking)
		if (flake.y > canvas.height)
		{
			flake.y = -5;
			flake.x = Math.random() * canvas.width;
		}

		// reset horizontally (NOT wrap — prevents edge buildup)
		if (flake.x > canvas.width || flake.x < 0)
		{
			flake.x = Math.random() * canvas.width;
		}

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
