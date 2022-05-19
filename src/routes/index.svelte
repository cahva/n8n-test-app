<script type="ts">
	import { onMount } from 'svelte';
	import { Jumper } from 'svelte-loading-spinners';
  import { fade } from 'svelte/transition';
	import Opinion from '$lib/components/Opinion.svelte';

	type Opinion = {
		name: string;
		opinion: string;
		createdAt: string;
		submittedFrom: string;
    id: string;
	};

  type LazyLoadImage = {
    src: string;
  };

	export let randomOpinion: Opinion | null = null;
	let loadingOpinion = false;
	const loaded = new Map();
	let loadingImage = false;
	let showChangeMyMind = false;

	const fetchRandomOpinion = async () => {
		const url = `/api/random-opinion`;
		const response = await fetch(url);

		const randomOpinion = await response.json();
		return randomOpinion;
	};

	const loadRandom = async () => {
    showChangeMyMind = false;
		loadingOpinion = true;
		const newOpinion = await fetchRandomOpinion();
    if (randomOpinion && newOpinion.id === randomOpinion.id) {
      loadRandom();
    }
    randomOpinion = newOpinion;

		loadingOpinion = false;
	};

	onMount(async () => {
		loadRandom();
	});

  

	function lazy(node:HTMLImageElement, data:LazyLoadImage) {
		loadingImage = true;
		const img = new Image();
		img.src = data.src;
		img.onload = () => {
			loaded.set(data.src, img);
			node.setAttribute('src', data.src);
			loadingImage = false;
		};

		return {
			destroy() {} // noop
		};
	}

	function onKeyDown(e) {
		switch (e.keyCode) {
			case 83:
				showChangeMyMind = !showChangeMyMind;
				break;
		}
	}
</script>

<svelte:head>
  <title>n8n demo app - home</title>
  <meta name="description" content="n8n demo app - home" />
  <meta name="keywords" content="n8n, demo, app, home" />
  <meta property="og:title" content="n8n demo app - home" />
  <meta property="og:description" content="n8n demo app - home" />
  <meta property="og:url" content="https://n8n-test-app.vercel.app" />
  <meta property="og:type" content="website">
</svelte:head>

<svelte:window on:keydown={onKeyDown} />

<h1>Welcome to n8n demo app</h1>
<p>
	You can go and <a href="/opinion">add an opinion </a> or
	<a
		href="https://www.notion.so/videosync/N8N-demo-opinions-adbd5eef1e594497aaacea2fbbe7ea2a"
		target="_blank">view other people's opinions.</a
	>
</p>
<div>
	<button class="loadbutton-container" on:click={loadRandom} disabled={loadingOpinion}>
		{#if loadingOpinion}
			<Jumper size="20" color="#FF3E00" unit="px" duration="1s" />
			<div>Fetching random opinion</div>
		{/if}
		{#if !loadingOpinion}
			<div>Load random opinion</div>
		{/if}
	</button>
</div>

{#if randomOpinion && !loadingOpinion}
	<h2 in:fade out:fade>Random opinion</h2>
{/if}
<Opinion opinion={randomOpinion} {loadingOpinion}/>
<!-- <p>Random opinion</p>
<Opinion opinion={randomOpinion} /> -->
{#if randomOpinion?.opinion && showChangeMyMind}
	<div class="changemymind" in:fade out:fade>
		{#if !loadingImage}
			<div>{randomOpinion.name}</div>
		{/if}
		<img
			class:loadingImage
			use:lazy={{
				src: `https://n8n-ext.vsy.io/webhook/c2ddbd41-4b6a-48c1-b678-f54dd070cfa6/change-my-mind/${randomOpinion.opinion}`
			}}
			src="/changemymind.jpg"
			alt={`change my mind - ${randomOpinion.name}`}
		/>
	</div>
{/if}

<style>
  h2 {
    font-size: 1.3rem;
    margin-top: 3rem;
  }
	.loadingImage {
		opacity: 0.1;
	}
	.changemymind {
		position: relative;
		border-radius: 1rem;
	}

	.changemymind div {
		position: absolute;
		top: 130px;
		left: 100px;
		right: 0;
		bottom: 0;
		font-size: 0.8em;
		font-weight: bold;
		color: pink;
		z-index: 1;
	}

	.changemymind img {
		width: 500px;
		height: 450px;
	}

	button {
		cursor: pointer;
    width: 100%;
	}

	.loadbutton-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}
</style>
