<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Button from '$lib/components/ui/button/button.svelte';
	import { RocketIcon } from 'lucide-svelte';
	import { StartupCard } from '$lib/components/startups';
	import { Can } from '$lib/components/shared';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { Role } from '$lib/types.js';
	import { getData } from '$lib/utils.js';

	let { data } = $props()

	const queryResult = useQuery(
		'startupData',
		() => getData(`/startups`, data.access!)
	);
	
	const role: Role = data.role as Role
	const message = role === 'Mentor' || role === 'Manager as Mentor' ? 'Manage assigned startups' : role === 'Startup' ? 'Manage startups' : '' ;

	const isLoading = $derived($queryResult.isLoading);
	const isError = $derived($queryResult.isError);
	const hasStartups = $derived($queryResult.data ? $queryResult.data.results.length > 0 : false);
	const listOfStartups = $derived($queryResult.isSuccess ? $queryResult.data.results : []);
</script>

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold">Startups</h2>
		<p class="text-muted-foreground">{message}</p>
	</div>
	<Can role={['Startup']} userRole={role}>
		<div class="flex gap-5">
			<Button class="flex items-center justify-center gap-2 rounded-lg" onclick={() => {}}>
				<RocketIcon class="h-4 w-4" /> Apply</Button
			>
		</div>
	</Can>
</div>

{#if isLoading}
	{@render loading()}
{:else if isError}
	{@render error()}
{:else if hasStartups}
	{@render startups()}
{:else}{/if}

{#snippet loading()}
	<div class="mt-3 grid grid-cols-4 gap-3">
		<Skeleton class="h-40 rounded-lg" />
		<Skeleton class="h-40 rounded-lg" />
		<Skeleton class="h-40 rounded-lg" />
	</div>
{/snippet}

{#snippet error()}
	<div>
		<p>Error fetching data. Contact support</p>
	</div>
{/snippet}

{#snippet startups()}
	<div class="mt-3 grid grid-cols-4 gap-3">
		{#each listOfStartups as startup}
			<StartupCard {startup} />
		{/each}
	</div>
{/snippet}
