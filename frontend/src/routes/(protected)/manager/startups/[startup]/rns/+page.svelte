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
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	const flipDurationMs = 300;

	function toggleOpen() {
		open = !open;
	}

	export let data;

	let access = data.access

	console.log(data.technology);

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
				window.location.href = `/mentor/startup/${data.startupId}/rns`;
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
				window.location.href = `/mentor/startup/${data.startupId}/rns`;
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
	let updateOpen = false;
	function toggleUpdateOpen() {
		updateOpen = !updateOpen;
	}
	let currItem = items[0].items[0].subItems[0];
	let currUpdateItem = tasks[0];
	function changeCurr(index: number, subIndex: number, i: number) {
		currItem = items[index].items[subIndex].subItems[i];
	}

	function changeUpdateCurr(index: number) {
		currUpdateItem = tasks[index];
	}

	async function updateTask(id: number) {
		await fetch(`${PUBLIC_API_URL}/tasks/tasks/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				description: currUpdateItem.description
			})
		});
	}

	async function updateTask2(id: number) {
		const response = await fetch(`${PUBLIC_API_URL}/tasks/tasks/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				description: currItem.description,
				target_level_id: currItem.target_level_id
			})
		});

		if (response.ok) {
			window.location.href = `/mentor/startup/${data.startupId}/rns`;
		}
	}
	console.log(tasks);
</script>

<svelte:head>
	<title>Recommended Next Steps</title>
</svelte:head>
<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Recommended Next Steps</h1>
		{#if data.allow && tasks.length === 0}
			<div class="flex gap-3">
				<!-- <Input placeholder="Enter number of tasks" /> -->
				<Button on:click={generateRNS} disabled={!data.allow}>Generate RNS</Button>
			</div>
		{:else if tasks.length > 0 && tasks[0].status === 1}
			<Button on:click={saveRNS}>Save</Button>
		{/if}
	</div>
</div>
<div class="flex flex-1 gap-6">
	{#if tasks.length > 0 && tasks[0].status !== 1}
		{#each items as item, index}
			<div class="flex flex-1 flex-col gap-1">
				<p class="text-[17px] font-medium">{item.title}</p>
				<div
					class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 overflow-scroll rounded-lg p-4"
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
												class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"
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
													<p class="text-sm">
														Target Level:

														{item.target_level_level}
													</p>
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
	{:else if tasks.length > 0}
		<div class="mx-auto flex h-fit w-2/3 gap-6">
			<div class="flex flex-1 flex-col gap-2">
				<p class="text-[17px] font-medium">Short Term</p>
				<div class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 rounded-lg p-4">
					{#each tasks.filter((task) => task.task_type === 1) as task, index}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"
							on:click={() => {
								toggleUpdateOpen();
								changeUpdateCurr(index);
							}}
						>
							<p>{task.description.substring(0, 80) + '...'}</p>
							<Badge class="w-fit">{task.readiness_type_rl_type}</Badge>
							<div class="flex items-center gap-1">
								<Target class="h-4 w-4" />
								<p class="text-sm">Target Level: {task.target_level_level}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex flex-1 flex-col gap-2">
				<p class="text-[17px] font-medium">Long Term</p>
				<div class="bg-muted dark:bg-muted/40 flex flex-1 flex-col gap-6 rounded-lg p-4">
					{#each tasks.filter((task) => task.task_type === 2) as task, index}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="dark:bg-muted flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5"
							on:click={() => {
								toggleUpdateOpen();
								changeUpdateCurr(tasks.filter((task) => task.task_type === 2).length + index);
							}}
						>
							<p>{task.description.substring(0, 80) + '...'}</p>
							<Badge class="w-fit">{task.readiness_type_rl_type}</Badge>
							<div class="flex items-center gap-1">
								<Target class="h-4 w-4" />
								<p class="text-sm">Target Level: {task.target_level_level}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{:else if generating}
		<div class="flex flex-1 items-center justify-center">
			<div class="flex flex-col items-center gap-3">
				<Spinner class="mr-2 h-10 w-10 animate-spin" />
				<h1>Generating Recommended Next Steps...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate Recommended Next Steps by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>
				Finish the Readiness and Needs Assessment first to be able to generate Recommended Next
				Steps for startup
			</h1>
		</div>
	{/if}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content class="h-[450px] max-w-[800px]">
		<div class="grid h-[250px] w-full gap-1.5">
			<Label>Description</Label>
			<Textarea bind:value={currItem.description} rows={20} class="text-lg" />
		</div>
		<Badge class="h-fit w-fit">Technology</Badge>
		<div class="flex items-center gap-1">
			<Target class="h-4 w-4" />
			<p class="text-sm">
				Target Level: <select
					on:change={(e) => {
						currItem.target_level_id = e.target.value;
					}}
				>
					{#if currItem.readiness_type_rl_type === 'Technology'}
						{#each data.technology as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currItem.readiness_type_rl_type === 'Market'}
						{#each data.market as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currItem.readiness_type_rl_type === 'Organizational'}
						{#each data.organizational as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currItem.readiness_type_rl_type === 'Regulatory'}
						{#each data.regulatory as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currItem.readiness_type_rl_type === 'Acceptance'}
						{#each data.acceptance as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currItem.readiness_type_rl_type === 'Investment'}
						{#each data.investment as level}
							<option value={level.id} selected={currItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{/if}
				</select>
			</p>
		</div>
		<div class="flex justify-end">
			<Button on:click={() => updateTask2(currItem.id)}>Save</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root open={updateOpen} onOpenChange={toggleUpdateOpen}>
	<Dialog.Content class="h-[450px] max-w-[800px]">
		<div class="grid h-[250px] w-full gap-1.5">
			<Label>Description</Label>
			<Textarea bind:value={currUpdateItem.description} rows={20} class="text-lg" />
		</div>
		<Badge class="h-fit w-fit">Technology</Badge>
		<div class="flex items-center gap-1">
			<Target class="h-4 w-4" />
			<p class="text-sm">
				Target Level: <select
					on:change={(e) => {
						currItem.target_level_id = e.target.value;
					}}
				>
					{#if currUpdateItem.readiness_type_rl_type === 'Technology'}
						{#each data.technology as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currUpdateItem.readiness_type_rl_type === 'Market'}
						{#each data.market as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currUpdateItem.readiness_type_rl_type === 'Organizational'}
						{#each data.organizational as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currUpdateItem.readiness_type_rl_type === 'Regulatory'}
						{#each data.regulatory as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currUpdateItem.readiness_type_rl_type === 'Acceptance'}
						{#each data.acceptance as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{:else if currUpdateItem.readiness_type_rl_type === 'Investment'}
						{#each data.investment as level}
							<option value={level.id} selected={currUpdateItem.target_level_level === level.level}
								>{level.level}</option
							>
						{/each}
					{/if}
				</select>
			</p>
		</div>
		<div class="flex justify-end">
			<Button on:click={() => updateTask(currUpdateItem.id)}>Save</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
