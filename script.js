// =========================
// APP HEIGHT LOCK (FIXES MOBILE STRETCH)
// =========================

function setAppHeight()
{
	document.documentElement.style.setProperty(
		"--app-height",
		window.innerHeight + "px"
	);
}

setAppHeight();

let heightTimeout;

window.addEventListener("resize", () =>
{
	clearTimeout(heightTimeout);

	heightTimeout = setTimeout(() =>
	{
		setAppHeight();
	}, 200);
});

// =========================
// SNOW SYSTEM 
// =========================

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];
let lastTime = 0;

let baseWidth = window.innerWidth;
let baseHeight = window.innerHeight;

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
// RESIZE (LOCK HEIGHT)
// =========================

function resizeCanvas(force = false)
{
	const newWidth = window.innerWidth;
	const newHeight = window.innerHeight;

	if (!force && newWidth === baseWidth)
	{
		return;
	}

	baseWidth = newWidth;
	baseHeight = newHeight;

	canvas.width = baseWidth;
	canvas.height = baseHeight;

	canvas.style.width = "100%";
	canvas.style.height = "100%";
}

window.addEventListener("resize", () =>
{
	resizeCanvas();
});

window.addEventListener("orientationchange", () =>
{
	setTimeout(() =>
	{
		resizeCanvas(true);
	}, 200);
});

// =========================
// CREATE SNOWFLAKES (WITH TRANSPARENCY + DEPTH)
// =========================

function createSnowflakes()
{
	const SETTINGS = getSettings();

	snowflakes = [];

	for (let i = 0; i < SETTINGS.count; i++)
	{
		const radius = Math.random() * 2.5 + 0.5;

		// depth factor (0 = far, 1 = close)
		const depth = radius / 3;

		snowflakes.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,

			radius: radius,

			// slower when far, faster when close
			speedY: (Math.random() * 0.8 + 0.3) * (0.5 + depth),
			speedX: (Math.random() * 0.4 - 0.2) * (0.5 + depth),

			// transparency based on depth
			alpha: 0.2 + (depth * 0.8)
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

	for (let flake of snowflakes)
	{
		flake.y += flake.speedY;
		flake.x += flake.speedX;

		if (flake.y > canvas.height)
		{
			flake.y = -5;
			flake.x = Math.random() * canvas.width;
		}

		if (flake.x > canvas.width || flake.x < 0)
		{
			flake.x = Math.random() * canvas.width;
		}

		ctx.beginPath();

		// apply transparency per flake
		ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;

		ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	requestAnimationFrame(updateSnow);
}

// =========================
// TOUCH SCROLL LOCK
// =========================

document.addEventListener("touchmove", (e) =>
{
	const scrollContainer = e.target.closest(".content-scroll");

	if (!scrollContainer)
	{
		e.preventDefault();
		return;
	}

	if (scrollContainer.scrollHeight <= scrollContainer.clientHeight)
	{
		e.preventDefault();
	}
}, { passive: false });

// =========================
// INIT
// =========================

resizeCanvas(true);
createSnowflakes();
requestAnimationFrame(updateSnow);
