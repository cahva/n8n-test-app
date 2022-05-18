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

</script>

<h1>Welcome to n8n demo app</h1>
<p>Random opinion</p>
<Opinion opinion={randomOpinion} />
<p>
	You can go and <a href="/opinion">add an opinion (please)</a> or
	<a
		href="https://www.notion.so/videosync/N8N-demo-opinions-adbd5eef1e594497aaacea2fbbe7ea2a"
		target="_blank">view other people's opinions.</a
	>
</p>
