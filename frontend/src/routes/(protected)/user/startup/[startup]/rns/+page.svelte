<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Target from 'lucide-svelte/icons/target';
	import { goto } from '$app/navigation';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	const flipDurationMs = 300;

	function toggleOpen() {
		open = !open;
	}

	export let data;
	let access = data.access
	let tasks = data.tasks;
	let generating = false;
	let generated: any = [];

	async function generateRNS() {
		generated = [];
		generating = true;
		const response = await fetch(`${PUBLIC_API_URL}/tasks/tasks/create-initial-tasks/`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				startup_id: data.startupId,
				term: 1,
				no_of_tasks_to_create: 3
			})
		});

		if (response.ok) {
			const another = await fetch(`${PUBLIC_API_URL}/tasks/tasks/create-initial-tasks/`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					startup_id: data.startupId,
					term: 2,
					no_of_tasks_to_create: 3
				})
			});

			if (another.ok) {
				generating = false;
			}
		}
	}

	async function saveRNS() {
		try {
			await Promise.all(
				tasks.map(async (task: any, i: number) => {
					await fetch(`${PUBLIC_API_URL}/tasks/tasks/${task.id}/`, {
						method: 'PATCH',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${access}`
						},
						body: JSON.stringify({
							priority_number: i + 1,
							status: 4
						})
					});
				})
			).then(async (values) => {
				const response = await fetch(`${PUBLIC_API_URL}/tasks/tasks/?startup_id=7`, {
					method: 'get',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${access}`
					}
				});

				const d = await response.json();

				if (response.ok) {
					tasks = d.results;
				}

				console.log(tasks);
			});
		} catch (error) {
			console.log(error);
		}
	}

	let items = [
		{
			title: 'Backlog',
			items: [
				{
					subTitle: 'Scheduled',
					subStatus: 4,
					subItems: tasks.filter((t: any) => t.status === 4)
				}
			]
		},
		{
			title: 'In Progress',
			items: [
				{
					subTitle: 'Track',
					subStatus: 5,
					subItems: tasks.filter((t: any) => t.status === 5)
				},
				{
					subTitle: 'Delayed',
					subStatus: 3,
					subItems: tasks.filter((t: any) => t.status === 3)
				}
			]
		},
		{
			title: 'Done',
			items: [
				{
					subTitle: 'Completed',
					subStatus: 6,
					subItems: tasks.filter((t: any) => t.status === 6)
				},
				{
					subTitle: 'Discontinued',
					subStatus: 2,
					subItems: tasks.filter((t: any) => t.status === 2)
				}
			]
		}
	];

	function handleDndConsider(e: any, x: number, y: number) {
		items[x].items[y].subItems = e.detail.items;
	}
	async function handleDndFinalize(e: any, x: number, y: number, status: number) {
		items[x].items[y].subItems = e.detail.items;
		if (e.detail.info.trigger == 'droppedIntoZone') {
			const task = e.detail.items.find((t) => t.id == e.detail.info.id);

			const response = await fetch(`${PUBLIC_API_URL}/tasks/tasks/${task.id}/`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					status: status
				})
			});
		}
	}

	let open = false;
	let currItem: { id: number; name: string } = items[0].items[0].subItems[0];

	function changeCurr(index: number, subIndex: number, i: number) {
		currItem = items[index].items[subIndex].subItems[i];
	}
</script>
<svelte:head>
	<title>Recommended Next Steps</title>
</svelte:head>
<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Recommended Next Steps</h1>
	</div>
</div>
<div class="flex flex-1 gap-6">
	{#if tasks.length > 0 && tasks[0].status !== 1}
		{#each items as item, index}
			<div class="flex flex-1 flex-col gap-1">
				<p class="text-[17px] font-medium">{item.title}</p>
				<div
					class="flex flex-1 flex-col gap-6 overflow-scroll rounded-lg bg-muted p-4 dark:bg-muted/40"
				>
					<div class="flex h-0 flex-col gap-6">
						{#each item.items as subItem, subIndex}
							<div class="flex flex-col gap-3">
								<div class="flex items-center gap-3">
									<p>{subItem.subTitle}</p>
									<button> <Plus class="h-4 w-4" /> </button>
								</div>
								<div
									class="flex flex-col gap-4"
									use:dndzone={{
										items: subItem.subItems,
										flipDurationMs,
										dropTargetStyle: {
											outline: 'rgba(255, 255, 255, 0) solid 2px'
										}
									}}
									on:consider={(e) => handleDndConsider(e, index, subIndex)}
									on:finalize={(e) => handleDndFinalize(e, index, subIndex, subItem.subStatus)}
								>
									{#if subItem.subItems.length === 0}
										<div class="h-40"></div>
									{:else}
										{#each subItem.subItems as item, i (item.id)}
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<div
												class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"
												animate:flip={{ duration: flipDurationMs }}
												on:click={() => {
													toggleOpen();
													changeCurr(index, subIndex, i);
												}}
											>
												<p>{item.description.substring(0, 80) + '...'}</p>
												<Badge class="w-fit">{item.readiness_type_rl_type}</Badge>
												<div class="flex items-center gap-1">
													<Target class="h-4 w-4" />
													<p class="text-sm">Target Level: {item.target_level_level}</p>
												</div>
											</div>
										{/each}
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="flex flex-1 items-center justify-center">
			Recommended Next Steps Board will show once your mentor is done finalizing it
		</div>
	{/if}
</div>
<!-- 
<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content>
		<p class="text-lg">{currItem.description}</p>
		<Badge class="w-fit">Technology</Badge>
		<div class="flex items-center gap-1">
			<Target class="h-4 w-4" />
			<p class="text-sm">Target Level: {5}</p>
		</div>
	</Dialog.Content>
</Dialog.Root> -->
<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[450px] max-w-[800px]">
		<div class="grid w-full gap-1.5 h-[250px]">
			<Label>Description</Label>
			<Textarea bind:value={currItem.description} rows={20} class="text-lg" disabled/>
		</div>
		<Badge class="h-fit w-fit">Technology</Badge>
		<div class="flex items-center gap-1">
			<Target class="h-4 w-4" />
			<p class="text-sm">Target Level: {currItem.target_level_level}</p>
		</div>
	</Dialog.Content>
</Dialog.Root>