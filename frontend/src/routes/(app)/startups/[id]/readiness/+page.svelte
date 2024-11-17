<script lang="ts">
	let isLoading: boolean = $state(false);
	let isError: boolean = $state(false);
	let isRated: boolean = $state(true);
	let isMentor = 'Startup';
	let message = 'test';
</script>

{#if isLoading}
	{@render loading()}
{:else if isError}
	{@render error()}
{:else if isRated}
	{@render rated()}
{:else if isMentor}
	{@render mentor()}
{:else}
	<div>
		<p>Looks like you haven't been rated yet</p>
	</div>
{/if}

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet rated()}{/snippet}

{#snippet mentor()}{/snippet}
