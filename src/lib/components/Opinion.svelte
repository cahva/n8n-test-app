<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  type opinion = {
    name: string;
    opinion: string;
    createdAt: string;
    submittedFrom: string;
  };

  export let opinion: opinion | null = null;

  $: submittedDate = opinion?.submittedFrom
		? new Intl.DateTimeFormat(['en-GB'], { dateStyle: 'long', timeStyle: 'short' }).format(
				new Date(opinion.createdAt)
		  )
		: null;
</script>

{#if opinion}
  <div class="opinion" in:fade>
    <blockquote>
      {opinion.opinion}
    </blockquote>
    <p>
      <cite>
        <strong>@{opinion.name}</strong> via {opinion.submittedFrom} on {submittedDate}
      </cite>
    </p>
  </div>
{/if}