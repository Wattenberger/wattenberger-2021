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
	Tweets

	<div class="grid">
		{#each chunkedTweets as tweetColumn}
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

<style>
	.grid {
		display: flex;
		max-width: 80em;
		margin: 2em auto;
	}
	.column {
		margin: 1em;
	}
	.tweet {
		margin-bottom: 2em;
		background: white;
		border: 1px solid #eee;
	}
	.tweet-text {
		padding: 2em 2.1em;
		font-size: 1.2em;
		line-height: 1.6em;
		font-weight: 300;
		white-space: pre-wrap;
	}
	.tweet-medias--double {
		display: grid;
		grid-template-columns: 1fr 1fr;
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
