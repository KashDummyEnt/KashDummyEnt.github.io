// =========================
// SNOW SYSTEM (UNCHANGED)
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


// =========================
// PAGE NAVIGATION (OPTION 3)
// =========================

const links = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

const order = ["home", "projects", "experience"];

let currentPage = "home";

function getIndex(page)
{
	return order.indexOf(page);
}

links.forEach(link =>
{
	link.addEventListener("click", () =>
	{
		const target = link.dataset.page;

		if (target === currentPage) return;

		const currentEl = document.getElementById(currentPage);
		const nextEl = document.getElementById(target);

		const currentIndex = getIndex(currentPage);
		const nextIndex = getIndex(target);

		const goingForward = nextIndex > currentIndex;

		// clear all animation classes
		pages.forEach(p =>
		{
			p.classList.remove(
				"active",
				"exit-left",
				"exit-right",
				"enter-left",
				"enter-right"
			);
		});

		// set incoming start position
		nextEl.classList.add(goingForward ? "enter-right" : "enter-left");

		// force reflow so animation triggers
		nextEl.offsetHeight;

		// animate current out
		currentEl.classList.add(goingForward ? "exit-left" : "exit-right");

		// animate next in
		nextEl.classList.add("active");

		// update nav active state
		links.forEach(l => l.classList.remove("active"));
		link.classList.add("active");

		currentPage = target;
	});
});
