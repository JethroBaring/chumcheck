<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import * as Dialog from '$lib/components/ui/dialog';
	import Label from '$lib/components/ui/label/label.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let readiness = [
		'Technology',
		'Market',
		'Acceptance',
		'Organizational',
		'Regulatory',
		'Investment'
	];

	export let data;
	let access = data.access
	console.log(data.rna);
	let rna = data.rna;

	let generating = false;
	let generated: any = [];
	async function generateRNA() {
		generated = [];
		generating = true;
		const response = await fetch(`${PUBLIC_API_URL}/startups/${data.startupId}/generate-rna`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${access}`
			}
		});

		const x = await response.json();

		if (response.ok) {
			generated.push(x.trl);
			generated.push(x.mrl);
			generated.push(x.arl);
			generated.push(x.orl);
			generated.push(x.rrl);
			generated.push(x.irl);
			generating = false;
		}
	}

	let open = false;
	let openUnsave = false;
	function toggleOpen() {
		open = !open;
	}

	function toggleOpenUnsave() {
		openUnsave = !openUnsave;
	}

	let currItemUnsave = 0;
	let currItem = rna[0];
	let curType = 0;
	function changeCurr(index: number, type: number) {
		currItem = rna.filter((d) => d.readiness_level_id === index)[0];
		curType = type;
	}

	function changeCurrUnsave(index: number) {
		currItemUnsave = index;
	}

	async function updateRNA(id: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startup-rna/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				rna: currItem.rna
			})
		});

		if (response.ok) {
			window.location.href = `/mentor/startup/${data.startupId}/rna`;
		}
	}
</script>

<svelte:head>
	<title>Readiness and Needs Assessment</title>
</svelte:head>
<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Readiness and Needs Assessment</h1>
		{#if data.allow && rna.length === 0}
			<Button on:click={generateRNA} disabled={!data.allow}>Generate RNA</Button>
		{/if}
	</div>
</div>
<div class="flex flex-1 flex-col">
	{#if rna.length > 0}
		<div class="flex flex-col items-center gap-6">
			{#each readiness as r, index}
				<Card.Root
					class="flex w-1/2 cursor-pointer flex-col gap-2 p-5"
					on:click={() => {
						toggleOpen();
						changeCurr(data.readiness[index].readiness_level_id, index);
					}}
				>
					<div>
						<span class="text-base font-semibold">{r} Level</span>
						<span class="rounded-lg bg-muted px-2 py-1">7</span>
					</div>
					<div>
						{rna
							.filter((d) => d.readiness_level_id === data.readiness[index].readiness_level_id)[0]
							.rna.substring(0, 100) + '...'}
					</div>
				</Card.Root>
			{/each}
		</div>
	{:else if generated.length > 0}
		<div class="flex flex-col items-center gap-6">
			{#each readiness as r, index}
				<Card.Root
					class="flex w-1/2 cursor-pointer flex-col gap-2 p-5 "
					on:click={() => {
						toggleOpenUnsave();
						changeCurrUnsave(index);
					}}
				>
					<div>
						<span class="text-base font-semibold">{r} Level</span>
						<span class="rounded-lg bg-muted px-2 py-1"
							>{data.readiness[index].readiness_level}</span
						>
					</div>
					<div>
						{generated[index].substring(0, 100) + '...'}
					</div>
				</Card.Root>
			{/each}
			<form method="post" class="flex flex-col gap-3">
				{#each readiness as r, index}
					<input type="hidden" name={`${r}`} value={data.readiness[index].readiness_level_id} />
					<input type="hidden" name={`${r}rna`} value={generated[index]} />
				{/each}
				<div class="flex justify-end"><Button type="submit">Save</Button></div>
			</form>
		</div>
	{:else if generating}
		<div class="flex flex-1 items-center justify-center">
			<div class="flex flex-col items-center gap-3">
				<Spinner class="mr-2 h-10 w-10 animate-spin" />
				<h1>Generating Readiness and Needs Assessment...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate Readiness and Needs Assessment by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>
				Finish the rubrics first to be able to generate Readiness and Needs Assessment for startup
			</h1>
		</div>
	{/if}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[400px] max-w-[800px]">
		<div>
			<span class="text-base font-semibold">{readiness[curType]} Level</span>
			<span class="rounded-lg bg-muted px-2 py-1">7</span>
		</div>
		<div class="grid h-[250px] w-full gap-1.5">
			<Label>Description</Label>
			<Textarea bind:value={currItem.rna} rows={20} class="text-lg" />
		</div>
		<div class="flex justify-end">
			<Button on:click={() => updateRNA(currItem.id)}>Save</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root open={openUnsave} onOpenChange={toggleOpenUnsave}>
	<Dialog.Content class="h-[400px] max-w-[800px]">
		<div>
			<span class="text-base font-semibold">{readiness[curType]} Level</span>
			<span class="rounded-lg bg-muted px-2 py-1">7</span>
		</div>
		<div class="grid h-[250px] w-full gap-1.5">
			<Label>Description</Label>
			<Textarea bind:value={generated[currItemUnsave]} rows={20} class="text-lg" />
		</div>
	</Dialog.Content>
</Dialog.Root>
