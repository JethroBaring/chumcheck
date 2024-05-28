<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import * as Dialog from '$lib/components/ui/dialog';
	const flipDurationMs = 300;
	let items = [
		{
			title: 'Backlog',
			items: [
				{
					subTitle: 'For reviews',
					subItems: [
						{ id: 1, name: 'item1' },
						{ id: 2, name: 'item2' },
						{ id: 3, name: 'item3' }
					]
				},
				{
					subTitle: 'Scheduled',
					subItems: [{ id: 4, name: 'item4' }]
				}
			]
		},
		{
			title: 'In Progress',
			items: [
				{
					subTitle: 'Track',
					subItems: [{ id: 5, name: 'item5' }]
				},
				{
					subTitle: 'Delayed',
					subItems: [{ id: 6, name: 'item6' }]
				}
			]
		},
		{
			title: 'Done',
			items: [
				{
					subTitle: 'Completed',
					subItems: []
				},
				{
					subTitle: 'Discontinued',
					subItems: []
				}
			]
		}
	];

	function handleDndConsider(e: any, x: number, y: number) {
		items[x].items[y].subItems = e.detail.items;
	}
	function handleDndFinalize(e: any, x: number, y: number) {
		items[x].items[y].subItems = e.detail.items;
	}

	let open = false;
	let currItem: { id: number; name: string } = items[0].items[0].subItems[0];

	function changeCurr(index: number, subIndex: number, i: number) {
		currItem = items[index].items[subIndex].subItems[i];
	}

	function toggleOpen() {
		open = !open;
	}
</script>

<div class="flex items-center">
	<h1 class="text-lg font-semibold md:text-2xl">Recommended Next Steps</h1>
</div>
<div class="flex flex-1 gap-6">
	{#each items as item, index}
		<div class="flex flex-1 flex-col gap-1">
			<p class="text-[17px] font-medium">{item.title}</p>
			<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted dark:bg-muted/40 p-4">
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
							on:finalize={(e) => handleDndFinalize(e, index, subIndex)}
						>
							{#if subItem.subItems.length === 0}
								<div class="h-40"></div>
							{:else}
								{#each subItem.subItems as item, i (item.id)}
									<button
										class="h-40 rounded-lg bg-white/60 dark:bg-muted"
										animate:flip={{ duration: flipDurationMs }}
										on:click={() => {
											toggleOpen();
											changeCurr(index, subIndex, i);
										}}
									>
										{item.name}
									</button>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{currItem.name}</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
