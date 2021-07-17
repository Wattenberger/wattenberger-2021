<script>
	import { pointer, interval } from 'd3';
	import values from 'lodash/values';
	import { onDestroy, onMount } from 'svelte';
	import MouseHeatmap from './MouseHeatmap.svelte';

	let mousePosition;
	let increment = 0;
	let timer;

	const onMouseMove = (e) => {
		mousePosition = [e.clientX, e.clientY];
	};

	const onTick = () => {
		// if (!positionXCounts[mousePosition[0]]) positionXCounts[mousePosition[0]] = 0;
		// if (!positionYCounts[mousePosition[1]]) positionYCounts[mousePosition[1]] = 0;
		// positionXCounts[mousePosition[0]]++;
		// positionYCounts[mousePosition[1]]++;
		increment++;
	};
	onMount(() => {
		timer = interval(onTick, 20);
	});
	onDestroy(() => {
		if (timer) timer.stop();
	});
</script>

<svelte:window on:mousemove={onMouseMove} />

<div class="map left">
	<MouseHeatmap orientation="y" position={mousePosition?.[1]} {increment} />
</div>
<div class="map bottom">
	<MouseHeatmap orientation="x" position={mousePosition?.[0]} {increment} />
</div>

<style>
	.map {
		position: fixed;
		pointer-events: none;
	}
	.left {
		left: 0;
		top: 0;
		bottom: 0;
		width: 0.6em;
	}
	.bottom {
		left: 0;
		right: 0;
		top: 0;
		height: 0.6em;
	}
</style>
