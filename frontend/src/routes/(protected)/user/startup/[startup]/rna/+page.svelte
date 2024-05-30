<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';	
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';

	export let data;
	let rna = data.rna;
	let readiness = data.readiness;
	let readiness_type = [
		'Technology',
		'Market',
		'Acceptance',
		'Organizational',
		'Regulatory',
		'Investment'
	];

	let open = false;
	function toggleOpen() {
		open = !open;
	}

	let currItem = rna[0];
	function changeCurr(index: number) {
		currItem = rna.filter((d) => d.readiness_level_id === index)[0]
	}
</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Readiness and Needs Assessment</h1>
	</div>
</div>
<div class="flex flex-1 flex-col">
	{#if rna.length > 0}
		<div class="flex flex-col items-center gap-6">
			{#each readiness_type as r, index}
				<Card.Root
					class="flex w-1/2 cursor-pointer flex-col gap-2 p-5"
					on:click={() => {
						toggleOpen();
						changeCurr(data.readiness[index].readiness_level_id);
					}}
				>
					<div>
						<span class="text-base font-semibold">{r} Level</span>
						<span class="rounded-lg bg-muted px-2 py-1">{readiness[index].readiness_level}</span>
					</div>
					<div>
						{rna
							.filter((d) => d.readiness_level_id === data.readiness[index].readiness_level_id)[0]
							.rna.substring(0, 100) + '...'}
					</div>
				</Card.Root>
			{/each}
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			Readiness and Needs Assessment will show once your mentor is done finalizing it
		</div>
	{/if}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[400px] max-w-[800px]">
		<div class="text-lg">{currItem.rna}</div>
	</Dialog.Content>
</Dialog.Root>