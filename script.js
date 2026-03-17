// =========================
// SNOW SYSTEM
// =========================

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let snowflakes = [];

function resizeCanvas()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createSnowflakes()
{
	snowflakes = [];

	for (let i = 0; i < 120; i++)
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

function updateSnow()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "white";

	for (let flake of snowflakes)
	{
		flake.y += flake.speedY;
		flake.x += flake.speedX;

		if (flake.y > canvas.height)
		{
			flake.y = -5;
			flake.x = Math.random() * canvas.width;
		}

		ctx.beginPath();
		ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	requestAnimationFrame(updateSnow);
}

createSnowflakes();
updateSnow();


