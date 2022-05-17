<script lang="ts">
	let name = '';
	let opinion = '';
	let sending = false;
	
	let sentOpinion = null;
	
	const sendOpinion = async () => {
		sending = true;
		try {
			const response = await fetch('https://n8n-ext.vsy.io/webhook-test/demo/add-opinion/form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					opinion
				})
			})
				.then(async (response) => {
					if (response.ok) {
						sentOpinion = await response.json();
						console.log(sentOpinion);
					} else {
						console.log(response);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
		sending = false;
		sentOpinion = { name, text: opinion };
		opinion = '';
	}
</script>

<svelte:head>
	<title>Send your opinion!</title>
</svelte:head>

<div class="container">
	<h1>
		Whats your opinion?
	</h1>
	<p>(about anything)</p>
	<form on:submit|preventDefault={sendOpinion}>
		<div>
			<label for="name">Name</label>
			<input name="name" placeholder="What your momma gave you." type="text" bind:value={name} />
		</div>
		<div>
			<label for="opinion">Opinion</label>
			<textarea placeholder="Lynx is better than Poleaxe!" name="opinion" bind:value={opinion} ></textarea>
		</div>
		
		<button type="submit" disabled={name.trim().length === 0 || opinion.trim().length === 0 || sending}>
			{#if sending}
				Sending your opinion...
			{:else}
				Send your opinion as the truth it is
			{/if}
		</button>
	</form>
	
	{#if sentOpinion}
		<h3>
			Your most recent sent opinion
		</h3>
		<div class="opinion">
				<h4>
					{sentOpinion.name}
				</h4>
				<p>
					{sentOpinion.text}
				</p>
			</div>
	{/if}
</div>

<style>
	
	label {
		
	}
	
	input[type="text"], textarea {
		width: 100%;
	}
	
	.container {
		display: grid;
		width: min(500px + 10%,90%);
		margin: auto;
		background: #fff;
		box-shadow: 0 0 3em rgba(0,0,0,.25);
		margin: 2rem;
		padding: 2rem;
	}

	h1 {
		font-size: clamp(2rem, 4vw, 4rem);
		margin: 0;
	}
</style>