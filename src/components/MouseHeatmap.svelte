<script>
	import { scaleCanvas } from './../utils';
	import { scaleLinear } from 'd3';

	export let orientation = 'x';
	export let position;
	export let increment = 0;

	let canvasElement;
	let width;
	let height;

	let lastPosition;

	const colorScale = scaleLinear()
		.domain([0, 100, 200, 300])
		.range(['#12CBC4', '#FDA7DF', '#5758BB', '#12CBC4']);

	const initCanvas = () => {
		if (!canvasElement) return;
		const ctx = canvasElement.getContext('2d');
		scaleCanvas(canvasElement, ctx, width, height);
	};

	const drawCanvas = () => {
		if (!Number.isFinite(position)) return;
		if (!Number.isFinite(lastPosition)) lastPosition = position;

		if (!canvasElement) return;
		const ctx = canvasElement.getContext('2d');
		// ctx.clearRect(0, 0, width, height);
		ctx.globalAlpha = 0.06;
		// ctx.globalAlpha = 1;

		// const lineWidth = 60;
		const padding = 220;
		const lineWidth = Math.abs(lastPosition - position) + padding * 2;
		const min = Math.min(lastPosition, position) - padding / 2;
		// Object.keys(positions).map((position) => {
		// const alpha = positions[position] / 30;
		// ctx.fillStyle = `#5C99A0`;
		const rectDimensions =
			orientation === 'x'
				? [min - lineWidth / 2, 0, lineWidth, height]
				: [0, min - lineWidth / 2, width, lineWidth];

		const gradient = ctx.createLinearGradient(
			rectDimensions[0],
			rectDimensions[1],
			orientation === 'x' ? rectDimensions[0] + rectDimensions[2] : rectDimensions[0],
			orientation === 'y' ? rectDimensions[1] + rectDimensions[3] : rectDimensions[1]
		);
		const color = colorScale(increment % 300);
		const transparentColor = color.replace('rgb', 'rgba').replace(')', ', 0)');
		const gradientOffset = padding / lineWidth;

		gradient.addColorStop(0, transparentColor);
		gradient.addColorStop(gradientOffset, color);
		gradient.addColorStop(1 - gradientOffset, color);
		gradient.addColorStop(1, transparentColor);
		ctx.fillStyle = gradient;

		lastPosition = position;

		ctx.fillRect(...rectDimensions);
	};
	$: width, initCanvas();
	$: increment, drawCanvas();
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<canvas bind:this={canvasElement} />
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
	canvas {
		position: absolute;
	}
</style>
