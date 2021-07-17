<script>
	import { forceSimulation } from 'd3';

	// an array of our particles
	export let nodes = [];
	// an array of [name, force] pairs
	export let forces = [];
	export let simulation;
	export let isRunning = false;

	let usedForceNames = [];

	$: {
		simulation = forceSimulation().nodes(nodes);
		if (!isRunning) simulation.stop();
	}

	$: {
		// re-initialize forces when they change
		forces.forEach(([name, force]) => {
			simulation.force(name, force);
		});

		// remove old forces
		const newForceNames = forces.map(([name]) => name);
		let oldForceNames = usedForceNames.filter((force) => !newForceNames.includes(force));
		oldForceNames.forEach((name) => {
			simulation.force(name, null);
		});
		usedForceNames = newForceNames;

		if (isRunning) {
			// kick our simulation into high gear
			simulation.alpha(1);
			simulation.restart();
		}
	}
</script>
