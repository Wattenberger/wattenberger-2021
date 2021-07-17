<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Dragger } from 'zdog';

	let dragger;

	export let onDragStart;
	export let onDragMove;
	export let onDragEnd;

	const { illustration, isReady } = getContext('illustration');

	const onInit = () => {
		if (typeof window === 'undefined') return;
		if (!$isReady) return;
		if (dragger) return;
		console.log('dragger2', $illustration);

		dragger = new Dragger({
			startElement: $illustration.element
		});
		$illustration.addChild(dragger);
		if ($illustration.updateRenderGraph) $illustration.updateRenderGraph();
	};

	const updateDragger = () => {
		if (!dragger) return;
		console.log('updateDragger');

		if (onDragStart) dragger.onDragStart = onDragStart;
		if (onDragMove) dragger.onDragMove = onDragMove;
		if (onDragEnd) dragger.onDragEnd = onDragEnd;
	};

	$: $isReady, onInit();
	$: onDragStart, onDragMove, onDragEnd, dragger, updateDragger();
</script>
