<script lang="ts">
	let isLoading: boolean = $state(false);
	let isError: boolean = $state(false);
	let isAccessible = 'Startup';
	let message = 'test';
</script>

{#if isLoading}
	{@render loading()}
{:else if isError}
	{@render error()}
{:else if isAccessible}
	{@render mentor()}
{:else}
	{@render fallback()}
{/if}

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet mentor()}{/snippet}

{#snippet  fallback()}
  
{/snippet}
