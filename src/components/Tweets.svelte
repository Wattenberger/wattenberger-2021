<script>
	import { onMount } from 'svelte';
	import wretch from 'wretch';
	import { range } from 'd3';
	import orderBy from 'lodash/orderBy';
	import { getLocalStorage, setLocalStorage } from './../utils';
	import { text } from 'svelte/internal';
	// import { getTimeline } from './../api.ts';

	let tweets = [];

	onMount(async () => {
		let fetchedTweets = getLocalStorage('tweets');
		if (!fetchedTweets) {
			fetchedTweets = await wretch('/api/tweets')
				.get()
				.json()
				.then((d) => d.tweets);
			setLocalStorage('tweets', fetchedTweets);
		}
		console.log('tweets', fetchedTweets);
		tweets = fetchedTweets;
	});

	const distributeTweets = (tweets, numberOfColumns = 3) => {
		let columns = range(numberOfColumns).map(() => ({
			tweets: [],
			height: 0
		}));
		tweets.forEach((tweet, i) => {
			const shortestColumn = orderBy(columns, 'height', 'asc')[0];
			shortestColumn.tweets = [...shortestColumn.tweets, tweet];
			shortestColumn.height = shortestColumn.height + tweet.height;
		});
		return columns.map(({ tweets }) => tweets);
	};

	$: chunkedTweets = distributeTweets(tweets, 2);
</script>

<div class="py-10">
	<h2>
		<div class="headline-shape" />
		<div>What have I been up to?</div>
	</h2>

	<div class="phone-wrapper">
		<div class="phone">
			<div class="grid-wrapper">
				<div class="grid">
					{#each [tweets] as tweetColumn}
						<div class="column">
							{#each tweetColumn as { text, height, media, public_metrics }}
								<div class="tweet" style="min-height: {height}px">
									{#if media.length}
										<div class="tweet-medias" class:tweet-medias--double={media.length > 1}>
											{#each media as { type, preview_image_url, url }}
												<div class="tweet-media">
													<!-- {#if type === 'image'} -->
													<img src={preview_image_url || url} />
													<!-- {:else if type === 'video'}
										<video src={preview_image_url} />
									{/if} -->
												</div>
											{/each}
										</div>
									{/if}

									<div class="tweet-text">
										{@html text}
									</div>

									{#if public_metrics}
										<div class="metrics">
											<div class="metric">
												❤️ {public_metrics.like_count}
											</div>
											<div class="metric">
												💬 {public_metrics.reply_count}
											</div>
											<div class="metric">
												🔄 {public_metrics.retweet_count}
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	h2 {
		font-weight: 900;
		font-size: 6em;
		margin-left: 7.1em;
		line-height: 1em;
		letter-spacing: -0.03em;
		max-width: 5em;
		position: absolute;
		top: 9em;
		z-index: 100;
	}
	.headline-shape {
		width: 1.27em;
		height: 6em;
		float: left;
		shape-outside: polygon(0 0, 100% 100%, 0% 100%);
	}
	.phone-wrapper {
		perspective: 800px;
		margin-bottom: 10em;
	}
	.phone {
		position: relative;
		display: flex;
		padding: 2em;
		max-width: 50vh;
		border: 1px solid #222;
		border-radius: 0.6em 1em;
		max-height: 70vh;
		transform: skew(8deg, -10deg) rotateY(20deg) translateX(15vh);
	}
	.phone:before {
		content: '';
		position: absolute;
		top: -1em;
		left: 0;
		right: 0;
		height: 2em;
		background: linear-gradient(to bottom, white, rgba(255, 255, 255, 0));
		z-index: 100;
	}
	.grid-wrapper {
		height: 100%;
		/* overflow: auto; */
		max-height: 70vh;
		border: 1px solid #222;
		border-radius: 0.3em;
	}
	.grid {
		height: calc(70vh);
		padding-top: 3em;
		flex: 1;
		display: flex;
		margin-top: -3em;
		/* max-width: 40em; */
		/* background: #f4f4f4; */
		overflow: auto;
	}
	.column {
		/* margin: 1em; */
	}
	.tweet {
		margin: 1em;
		margin-bottom: 2em;
		background: white;
		/* border: 1px solid #eee; */
		overflow: hidden;

		/* box-shadow: 11px 11px 22px #dbdbdb, -11px -11px 22px #ffffff; */
		/* box-shadow: -20px 20px 60px #bebebe, 20px -20px 60px #ffffff; */
		box-shadow: -16px 16px 32px #d9d9d9, 16px -16px 32px #ffffff;
		border-radius: 2em;
	}
	.tweet-text {
		padding: 2em 2.1em;
		font-size: 1.2em;
		line-height: 1.6em;
		font-weight: 300;
		white-space: pre-wrap;
	}
	.tweet-medias--double {
		/* display: grid; */
		/* grid-template-columns: 1fr 1fr; */
		display: flex;
		/* grid-gap: 2px; */
	}
	.tweet-media {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tweet-media img {
		max-width: 100%;
		max-height: 20em;
	}
	.metrics {
		display: flex;
	}
	.metric {
		flex: 1;
		text-align: center;
		padding: 1em;
		border-right: 1px solid #eee;
	}
</style>
