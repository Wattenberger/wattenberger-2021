<script>
	import { tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import random from 'lodash/random';
	import sample from 'lodash/sample';
	import { interpolate, range, pointer, forceCollide, forceX, forceY } from 'd3';
	import { Vector, TAU } from 'zdog';
	import Shape from './../components/ZDog/Shape.svelte';
	import Force from './../components/Force.svelte';
	import Illustration from './../components/ZDog/Illustration.svelte';
	import { kerning, paths } from './../paths';

	const letterWidth = 120;
	const letters = 'WATTENBERGER'.split('');

	let width;
	let height;
	let dragStartRX;
	let dragStartRY;

	let dragStart;
	let viewRotation = new Vector();
	const mousePosition = tweened({ x: 0, y: 0 }, { duration: 300 });

	const rotations = tweened(
		letters.map((_) => ({ x: 0, y: 0 })),
		{
			duration: 6000
		}
	);
	const colors = [
		'#3c7088',
		'#20344F'
		// '#D0CDE5',
		// '#8D9ADE',
		// '#8DB9B7',
		// '#D8A5A3',
		// '#454153',
		// // '#152A5A',
		// // '#224A45',
		// // '#78A096',
		// // '#1E3E61',
		// '#F0E2AA',
		// '#EDDCE8'
	];
	const getLetterColors = () => letters.map((_, i) => sample(colors));
	const letterColors = tweened(getLetterColors(), { duration: 2000, interpolate: interpolate });

	const onTick = () => {
		const doRotate = Math.random() < 0.01;
		if (doRotate) {
			const rotationIndex = random(0, letters.length - 1);

			const newRotations = [...$rotations];
			newRotations[rotationIndex].y += random(0, Math.PI * 20, true);
			$rotations = newRotations;
		}
	};

	let runningX = 0;
	let initialLetterPositions = letters.map((letter, i) => {
		const lastLetter = letters[i - 1];
		const kerningPair = [lastLetter, letter].join('');
		const xOffset = (lastLetter && kerning[kerningPair]) || 0;
		const x = runningX + xOffset + letterWidth;
		runningX += xOffset + letterWidth;
		return {
			x,
			y: 0,
			letter,
			// z: random(-20, 20),
			z: 10,
			r: letterWidth * 0.6
		};
	});
	const totalLetterWidth = initialLetterPositions.slice(-1)[0].x;
	initialLetterPositions = initialLetterPositions.map((d) => ({
		...d,
		x: d.x - totalLetterWidth / 2
	}));
	let letterPositions = tweened(initialLetterPositions, {
		duration: 1000
	});
	const numberOfSparkles = 60;
	const initialSparklePositions = range(0, numberOfSparkles).map((_, i) => ({
		x: 0,
		y: 0,
		z: random(-60, 60),
		r: letterWidth * 0.3
	}));
	let sparklePositions = tweened(initialSparklePositions, {
		duration: 1000
	});
	let simulationNodes = [
		{ x: 0, y: 0 },
		...initialSparklePositions,
		...initialLetterPositions
	].map((d) => ({ ...d }));

	let simulation;

	$: forces = [
		['x', forceX().x(0).strength(0.1)],
		['y', forceY().y(0).strength(0.1)],
		[
			'collide',
			forceCollide()
				.radius((d) => d.r)
				.strength(1)
		]
	].filter(Boolean);
	const onSimulationTick = () => {
		if (simulation) simulation.tick();

		$letterPositions = $letterPositions.map((d, i) => ({
			...d,
			x: simulationNodes[i + 1 + numberOfSparkles].x,
			y: simulationNodes[i + 1 + numberOfSparkles].y
		}));
		$sparklePositions = $sparklePositions.map((d, i) => ({
			...d,
			x: simulationNodes[i + 1].x,
			y: simulationNodes[i + 1].y
		}));

		setTimeout(onSimulationTick, 300);
	};
	onSimulationTick();
</script>

<Force bind:nodes={simulationNodes} bind:simulation {forces} />

<div
	class="illustration"
	bind:clientWidth={width}
	bind:clientHeight={height}
	style="width: 100%"
	on:mousemove={(e) => {
		const [x, y] = pointer(e);
		$mousePosition = { x: x - width / 2, y: y - height / 2 };
		simulationNodes[0].x = $mousePosition.x;
		simulationNodes[0].y = $mousePosition.y;
	}}
>
	<Illustration
		zoom={0.7}
		{onTick}
		dragRotate={false}
		onDragStart={() => {
			$letterColors = getLetterColors();

			dragStartRX = viewRotation.x;
			dragStartRY = viewRotation.y;
		}}
		onDragMove={(pointer, moveX, moveY) => {
			let moveRX = (moveY / width) * TAU * -1;
			let moveRY = (moveX / width) * TAU * -1;
			viewRotation.x = dragStartRX + moveRX;
			viewRotation.y = dragStartRY + moveRY;
			$rotations = $rotations.map(({ x, y }) => ({
				// x: x + viewRotation.x * 20,
				y: y + viewRotation.y * 20
			}));
		}}
	>
		<Shape
			type="Ellipse"
			diameter={680}
			stroke={20}
			fill={true}
			color="#8ebccb"
			translate={$mousePosition}
		/>

		{#each $letterPositions as { x, y, z, letter }, i}
			<Shape type="Anchor" translate={{ x, y, z }}>
				<Shape
					type="Shape"
					path={paths[letter]}
					closed={false}
					stroke={23}
					color={$letterColors[i]}
					rotate={$rotations[i]}
				/>
			</Shape>
		{/each}
		{#each $sparklePositions as { x, y, z }, i}
			<Shape
				type="Ellipse"
				translate={{ x, y, z }}
				diameter={20}
				stroke={0}
				fill={true}
				color={'white'}
			/>
		{/each}
		<!-- <Shape type="Ellipse" diameter={80} stroke={20} fill={true} color="#C25" /> -->
	</Illustration>
</div>

<style>
	.illustration {
		min-height: 20em;
		height: 80vh;
		width: 100%;
	}
</style>
