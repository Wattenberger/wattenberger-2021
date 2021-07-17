<script>
	import MouseHeatmaps from './../components/MouseHeatmaps.svelte';

	// import Pie from './../components/Pie.svelte';
	import Tweets from './../components/Tweets.svelte';
</script>

<MouseHeatmaps />
<header>
	<h1>Welcome!</h1>
	<p>I'm Amelia Wattenberger, a developer/designer/data visualizer/maker/???</p>

	<!-- <Pie /> -->
</header>

<Tweets />

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80vh;
		padding: 2em 6em;
		/* background: #8ebccb;
		background: #85b3c3; */
		/* color: #fff; */
	}
	p {
		padding-left: 1em;
		font-size: 2em;
		line-height: 1.6em;
		max-width: 40em;
		font-weight: 200;
	}
</style>
