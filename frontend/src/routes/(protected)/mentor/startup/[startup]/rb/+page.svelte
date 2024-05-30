<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import { onMount } from 'svelte';

	let access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTY1MTg0LCJpYXQiOjE3MTY5MDU5ODQsImp0aSI6ImMzZmFlOGZlYmY2YzQwNThhZDQxZWQ3MzMyNjlhYTBhIiwidXNlcl9pZCI6NiwidXNlcl90eXBlIjoiTUUifQ.-R00RI1Plp1-UlD0kEKrvj8w54t-5ZdH2fd-0F3oLIE';

	export let data;

	let roadblocks = data.roadblocks;

	let generating = false;
	let generated: any = [];
	async function generateRNA() {
		generated = [];
		generating = true;
		const response = await fetch(
			`http://127.0.0.1:8000/tasks/roadblocks/create-initial-roadblocks/`,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					startup_id: data.startupId,
					no_of_roadblocks_to_create: 3
				})
			}
		);

		const x = await response.json();

		if (response.ok) {
			window.location.href = `/mentor/startup/${data.startupId}/rb`;
			generating = false;
		}
	}

	let open = false;

	function toggleOpen() {
		open = !open;
	}
	let currItem = roadblocks[0];
	function changeCurr(index: number) {
		currItem = roadblocks[index];
		currItem.assignee_id = data.startup.members[0].user_id;
	}

	async function updateRoadblock(id: number) {
		const response = await fetch(`http://127.0.0.1:8000/tasks/roadblocks/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				description: currItem.description,
				fix: currItem.fix,
				assignee_id: currItem.assignee_id
			})
		});

		if(response.ok) {
			window.location.href = `/mentor/startup/${data.startupId}/rb`;
		}
	}
</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Roadblocks</h1>
		{#if data.allow && roadblocks.length === 0}
			<Button on:click={generateRNA} disabled={!data.allow}>Generate Roadblocks</Button>
		{/if}
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
						<div>
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
	{:else if generated.length > 0}
		{#each roadblocks as r, index}
			<Card.Root class="flex w-1/2 cursor-pointer flex-col gap-2 p-5">
				<div class="flex justify-between">
					<div>
						<span class="text-base font-semibold">Risk </span>
						<span class="rounded-lg bg-muted px-2 py-1">{index + 1}</span>
					</div>
					<div>Assignee: Jethro Baring</div>
				</div>
				<div>
					{r.description.substring(0, 100) + '...'}
				</div>
			</Card.Root>
		{/each}
	{:else if generating}
		<div class="flex flex-1 items-center justify-center">
			<div class="flex flex-col items-center gap-3">
				<Spinner class="mr-2 h-10 w-10 animate-spin" />
				<h1>Generating Roadblocks...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate Roadblocks by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>Finish the Initiatives first to be able to generate Roadblocks for startup</h1>
		</div>
	{/if}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[400px] max-w-[800px]">
		<Textarea bind:value={currItem.description} rows={20} class="text-lg" />
		<Textarea bind:value={currItem.fix} rows={20} class="text-lg" />
		<Select.Root
			selected={currItem.assignee_id.value}
			onSelectedChange={(v) => {
				v && (currItem.assignee_id = v.value);
			}}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Choose a mentor" />
			</Select.Trigger>
			<Select.Content>
				{#each data.startup.members as member}
					<Select.Item value={member.user_id}
						>{`${member.first_name} ${member.last_name}`}</Select.Item
					>
				{/each}
			</Select.Content>
		</Select.Root>
		<div class="flex justify-end">
			<Button on:click={() => updateRoadblock(currItem.id)}>Save</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
