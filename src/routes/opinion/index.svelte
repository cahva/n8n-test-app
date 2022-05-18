<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Opinion from '$lib/components/Opinion.svelte';
	export let sentOpinion: Opinion | null = null;
	export let error: String | null = null;
	let name = '';
	let opinion = '';
	let sending = false;

	type Opinion = {
		name: string;
		text: string;
	};

	// sentOpinion which defaults to null but is type of Opinion
	$: console.log(sentOpinion);

	const handleSubmit = async (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement;
		sending = true;
		// Send formdata to server
		try {
			const response = await fetch('/opinion', {
				method: 'POST',
				headers: {
					accept: 'application/json'
				},
				body: new FormData(form)
			});
			sending = false;

			if (response.ok) {
				const opinion: Opinion = await response.json();
				sentOpinion = opinion;
			} else {
				error = 'Something went wrong';
			}
		} catch (error) {
			console.error(error);
			error = 'Something went wrong';
		} finally {
			form.reset();
			sending = false;
		}
	};
</script>

<svelte:head>
	<title>Send your opinion!</title>
</svelte:head>

<div class="container">
	<h1 in:fade>Whats your opinion?</h1>
	<p in:fade="{{ delay: 400 }}">(about anything)</p>
	<form method="post" on:submit|preventDefault={handleSubmit} name="opinionform">
		<div>
			<label for="name">Name</label>
			<input name="name" placeholder="What your momma gave you." type="text" bind:value={name} />
		</div>
		<div>
			<label for="opinion">Opinion</label>
			<textarea placeholder="Lynx is better than Poleaxe!" name="opinion" bind:value={opinion} />
		</div>

		<button
			type="submit"
			disabled={name.trim().length === 0 || opinion.trim().length === 0 || sending}
		>
			{#if sending}
				Sending your opinion...
			{:else}
				Send your opinion as the truth it is
			{/if}
		</button>
	</form>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	{#if sentOpinion}
		<h3>You've sent your opinion</h3>
		<Opinion opinion={sentOpinion} />
	{/if}
</div>
<footer>
	<p>
		<a
			href="https://www.notion.so/videosync/N8N-demo-opinions-adbd5eef1e594497aaacea2fbbe7ea2a"
			target="_blank"
		>
			View other people's opinions
		</a> - <a href="/">Back to home</a>
	</p>
</footer>

<style>
	input[type='text'],
	textarea {
		width: 100%;
	}

	footer {
		text-align: center;
	}

	.container {
		display: grid;
		width: min(500px + 10%, 90%);
		margin: auto;
		background: #fff;
		box-shadow: 0 0 3em rgba(0, 0, 0, 0.25);
		margin: 2rem;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(2rem, 4vw, 4rem);
		margin: 0;
	}

</style>
