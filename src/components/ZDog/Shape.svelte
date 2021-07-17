<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Zdog from 'zdog';

	export let type = 'Rect';

	let shape = writable();

	export let translate;
	export let rotate;
	export let fill;
	export let stroke;
	export let color;
	export let diameter;
	export let path;
	export let closed;

	$: config = { translate, rotate, fill, stroke, color, diameter, path, closed };

	const { illustration, isReady, parent } = getContext('illustration');
	setContext('illustration', {
		parent: shape
	});

	const onInit = () => {
		if (!$parent) return;
		if ($shape) return;

		$shape = new Zdog[type]();
		$parent.addChild($shape);
		if ($parent.updateRenderGraph) $parent.updateRenderGraph();
	};

	const updateShape = () => {
		if (!$shape) return;

		for (let key in config) {
			$shape[key] = config[key];
		}
		if ($shape.updatePath) $shape.updatePath();
	};

	$: $isReady, $parent, onInit();
	$: type, config, $shape, updateShape();
</script>

<slot />
