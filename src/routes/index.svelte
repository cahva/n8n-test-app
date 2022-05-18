<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
  

	export const load: Load = async ({ fetch }) => {
		const url = `/api/random-opinion`;
		const response = await fetch(url);

		const randomOpinion = await response.json();

		return {
			status: response.status,
			props: {
				randomOpinion
			}
		};
	};
</script>

<script type="ts">
	import Opinion from '$lib/components/Opinion.svelte';

	type Opinion = {
		name: string;
		opinion: string;
		createdAt: string;
		submittedFrom: string;
	};
	export let randomOpinion: Opinion | null = null;
  const loaded = new Map();
  let loadingImage=false;

  function lazy(node, data) {
      loadingImage=true;
      const img = new Image();
      img.src = data.src;
      img.onload = () => {
        loaded.set(data.src, img);
        node.setAttribute('src', data.src);
        loadingImage=false;
      };

		return {
			destroy(){} // noop
		};
	}

</script>

<h1>Welcome to n8n demo app</h1>
<p>Random opinion</p>
<Opinion opinion={randomOpinion} />
{#if randomOpinion?.opinion}
<div class="changemymind">

  {#if !loadingImage}
  <div>{randomOpinion.name}</div>
  {/if}
  <img class:loadingImage={loadingImage} use:lazy={{src: `https://n8n-ext.vsy.io/webhook/c2ddbd41-4b6a-48c1-b678-f54dd070cfa6/change-my-mind/${randomOpinion.opinion}`}} src='/changemymind.jpg' alt={`change my mind - ${randomOpinion.name}`}/>
</div>
{/if}
<p>
	You can go and <a href="/opinion">add an opinion (please)</a> or
	<a
		href="https://www.notion.so/videosync/N8N-demo-opinions-adbd5eef1e594497aaacea2fbbe7ea2a"
		target="_blank">view other people's opinions.</a
	>
</p>

<style>
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
    left: 150px;
    right: 0;
    bottom: 0;
    font-size: .8em;
    font-weight: bold;
    color: pink;
    z-index: 1;
  }

  .changemymind img {
    width: 500px;
    height: 450px;
  }
</style>
