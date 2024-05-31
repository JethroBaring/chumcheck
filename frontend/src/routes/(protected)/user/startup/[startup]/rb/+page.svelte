<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	export let data;

	let roadblocks = data.roadblocks;
	let open = false;

	function toggleOpen() {
		open = !open;
	}
	let currItem = roadblocks[0];
	let currIndex = 0;
	function changeCurr(index: number) {
		currItem = roadblocks[index];
		currItem.assignee_id = data.startup.members[0].user_id;
		currIndex = index;
	}
</script>

<svelte:head>
	<title>Roadblocks</title>
</svelte:head>
<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Roadblocks</h1>
	</div>
</div>
<div class="flex flex-1 flex-col">
	{#if roadblocks.length > 0}
		<div class="flex flex-col items-center gap-6">
			{#each roadblocks as r, index}
				<Card.Root
					class="flex w-1/2 cursor-pointer flex-col gap-2 p-5"
					on:click={() => {
						toggleOpen();
						changeCurr(index);
					}}
				>
					<div class="flex justify-between">
						<div>
							<span class="text-base font-semibold">Risk </span>
							<span class="rounded-lg bg-muted px-2 py-1">{index + 1}</span>
						</div>
						<div class:text-green-500={data.userId === r.assignee_id}>
							Assignee: {#if r.assignee_id}
								{`${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].first_name} ${data.startup.members.filter((d) => d.user_id === r.assignee_id)[0].last_name}`}
							{:else}
								None
							{/if}
						</div>
					</div>
					<div>
						{r.description.substring(0, 100) + '...'}
					</div>
				</Card.Root>
			{/each}
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			Roadblocks will show once your mentor is done finalizing it
		</div>
	{/if}
</div>

<!-- <Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[400px] max-w-[800px]">
		<div class="text-lg">{currItem.description}</div>
		<div class="text-lg">{currItem.fix}</div>
	</Dialog.Content>
</Dialog.Root> -->

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[550px] max-w-[800px]">
		<div>
			<span class="text-base font-semibold">Risk </span>
			<span class="rounded-lg bg-muted px-2 py-1">{currIndex + 1}</span>
		</div>
		<div class="grid h-[160px] w-full gap-1.5">
			<Label>Description</Label>
			<Textarea bind:value={currItem.description} rows={15} class="text-lg" disabled/>
		</div>
		<div class="grid h-[160px] w-full gap-1.5">
			<Label>Measures</Label>
			<Textarea bind:value={currItem.fix} rows={15} class="text-lg" disabled/>
		</div>
		<div class="grid h-[100px] w-full gap-1.5">
			<Label>Assignee</Label>
			{#if currItem.assignee_id}
				<Input
					value={`${data.startup.members.filter((d) => d.user_id === currItem.assignee_id)[0].first_name} ${data.startup.members.filter((d) => d.user_id === currItem.assignee_id)[0].last_name}`}
					class="text-lg"
					disabled
				/>
			{:else}
				<Input value={'None'} class="text-lg" disabled/>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
