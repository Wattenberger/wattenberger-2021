<script>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Dragger, Illustration, extend } from 'zdog';

	export let renderer = 'canvas';
	export let onTick;
	let { ...config } = $$props;

	export let onDragStart;
	export let onDragMove;
	export let onDragEnd;

	let dragger;
	// let width = 1000;
	// let height = 1000;
	let isActive = true;

	let canvasElement;
	let illustration = writable(null);
	let isReady = writable(false);

	const onInit = () => {
		if (!canvasElement) return;
		if ($isReady) return;

		$illustration = new Illustration({
			element: canvasElement,
			resize: true,
			dragRotate: true,
			centered: true,
			...config
		});

		dragger = new Dragger({
			startElement: $illustration.element
		});
		$isReady = true;
		onTickLocal();
	};

	const updateDragger = () => {
		if (!dragger) return;
		if (onDragStart) dragger.onDragStart = onDragStart;
		if (onDragMove) dragger.onDragMove = onDragMove;
		if (onDragEnd) dragger.onDragEnd = onDragEnd;
	};

	$: onDragStart, onDragMove, onDragEnd, dragger, updateDragger();

	const updateIllustration = () => {
		if (!$illustration) return;
		extend($illustration, config);
	};
	$: config, updateIllustration();

	const onTickLocal = () => {
		if (!isActive) return;
		// $illustration.rotate.y += 0.03;
		$illustration.updateRenderGraph();
		// setTimeout(onTickLocal, 10000);
		requestAnimationFrame(onTickLocal);
		if (onTick) onTick();
	};

	onMount(onInit);
	onDestroy(() => (isActive = false));

	setContext('illustration', {
		illustration,
		parent: illustration,
		isReady
	});
</script>

<div style="width: 100%; height: 100%;">
	{#if renderer === 'canvas'}
		<canvas bind:this={canvasElement} style="max-width: 100%; width: 100%; height: 100%" />
	{:else}
		<svg bind:this={canvasElement} />
	{/if}
	<slot />
</div>

<style>
	canvas {
		cursor: move;
	}
</style>
