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

<!DOCTYPE html>
<html>
<head>
	<title>KashDummyEnt</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>

<canvas id="snow"></canvas>

<header class="topbar">

	<div class="left">
		<img src="images/kashdummyonlylogo.png" alt="Logo">
	</div>

	<div class="center">
		<a class="nav-link active" data-page="home">Home</a>
		<a class="nav-link" data-page="projects">Projects</a>
		<a class="nav-link" data-page="experience">Experience</a>
	</div>

	<div class="right">
		<a href="https://discord.com/users/202986360259215370" target="_blank">Contact</a>
	</div>

</header>

<!-- ========================= -->
<!-- PAGES -->
<!-- ========================= -->

<div id="pages">

	<!-- HOME -->
	<section class="page active" id="home">

		<main>

			<img class="home-logo" src="images/kashdummytextlogo.png" alt="KashDummyEnt">

			<p>
			Roblox systems developer specializing in gameplay scripting,
			AI systems, anti-cheat systems, and server architecture.
			</p>

			<div class="social-buttons">

				<a class="social-btn discord" href="https://discord.com/users/202986360259215370" target="_blank">
					<div class="icon">
						<img src="images/discord.png" alt="Discord">
					</div>
					<div class="label">kashdummy</div>
				</a>

				<a class="social-btn roblox" href="https://www.roblox.com/users/5032577/profile" target="_blank">
					<div class="icon">
						<img src="images/roblox.png" alt="Roblox">
					</div>
					<div class="label">kurmpy</div>
				</a>

			</div>

		</main>

	</section>

	<!-- PROJECTS -->
	<section class="page" id="projects">

		<div class="content-scroll">
			<main>
				<div class="project-grid">

					<div class="project-card">
						<img src="images/Slenderman.png">
						<h2>SCP Horror</h2>
					</div>

					<div class="project-card">
						<img src="images/ComputerOS.png">
						<h2>Computer OS</h2>
					</div>

					<div class="project-card">
						<img src="images/3DMinimap.png">
						<h2>3D Minimap</h2>
					</div>

					<div class="project-card">
						<img src="images/HVHShooter.png">
						<h2>HVH Shooter</h2>
					</div>

					<div class="project-card">
						<img src="images/MazeGen.png">
						<h2>Maze Gen / Ai Solver</h2>
					</div>

					<div class="project-card">
						<img src="images/MagicSort.png">
						<h2>Magic Sort</h2>
					</div>

					<div class="project-card">
						<img src="images/SuperSmashBlox.png">
						<h2>Super Smash Blox</h2>
					</div>

				</div>
			</main>
		</div>

	</section>

	<!-- EXPERIENCE -->
	<section class="page" id="experience">

		<main>

			<h1>Experience</h1>

			<ul class="work-list">
				<li>Roblox Gameplay Systems Development</li>
				<li>AI and NPC Behavior Systems</li>
				<li>Server Architecture and Optimization</li>
				<li>Anti-Cheat Systems</li>
				<li>Combat and Ability Systems</li>
			</ul>

		</main>

	</section>

</div>

<script src="script.js"></script>

<script>
	const links = document.querySelectorAll(".nav-link");
	const pages = document.querySelectorAll(".page");

	links.forEach(link =>
	{
		link.addEventListener("click", () =>
		{
			const target = link.dataset.page;

			// update active nav
			links.forEach(l => l.classList.remove("active"));
			link.classList.add("active");

			// switch pages
			pages.forEach(page =>
			{
				page.classList.remove("active");
			});

			document.getElementById(target).classList.add("active");
		});
	});
</script>

</body>
</html>
