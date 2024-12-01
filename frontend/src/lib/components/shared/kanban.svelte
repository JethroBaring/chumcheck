<script lang="ts">
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { Column } from '.';
	let {
		handleDndConsider,
		handleDndFinalize,
		columns,
		card,
		showDialog,
	}: {
		handleDndConsider: any;
		handleDndFinalize: any;
		columns: any;
		card: any;
		showDialog: any
	} = $props();

	const flipDurationMs = 300;
</script>

{#each columns as column, index}
	{#if column.show}
		<Column name={column.name} {showDialog}>
			<div
				use:dndzone={{
					items: column.items,
					flipDurationMs,
					dropTargetStyle: {
						outline: 'rgba(255, 255, 255, ) solid 2px'
					}
				}}
				onconsider={(e) => handleDndConsider(e, index)}
				onfinalize={(e) => handleDndFinalize(e, index, column.value)}
				class="flex h-[700px] flex-col gap-3 overflow-scroll"
			>
				{#if column.items.length === 0}
					<div class="h-40"></div>
				{:else}
					{#each column.items as item (item.id)}
						<div animate:flip={{ duration: flipDurationMs }}>
							{@render card(item)}
							<!-- <Card.Root>
								<Card.Content class="flex h-[150px] flex-col justify-between">
									<div class="flex flex-col gap-1">
										<div class="flex items-center justify-between">
											<h2 class="text-[15px] font-semibold leading-none tracking-tight">
												{`${item.readiness_type_rl_type} Target Level: ${item.target_level_level}`}
											</h2>
											<DropdownMenu.Root>
												<DropdownMenu.Trigger>
													<Ellipsis class="h-4 w-4" />
												</DropdownMenu.Trigger>
												<DropdownMenu.Content align="end">
													<DropdownMenu.Group>
														<DropdownMenu.Item
															onclick={() => {
																currentTask = item;
																open = true;
																action = 'view';
															}}>View</DropdownMenu.Item
														>
														<DropdownMenu.Item
															onclick={() => {
																currentTask = item;
																open = true;
																action = 'edit';
															}}>Edit</DropdownMenu.Item
														>
														<DropdownMenu.Item
															onclick={() => {
																currentTask = item;
																open = true;
																action = 'delete';
															}}>Delete</DropdownMenu.Item
														>
													</DropdownMenu.Group>
												</DropdownMenu.Content>
											</DropdownMenu.Root>
										</div>
										<div class="text-sm text-muted-foreground">
											{item.description.slice(0, 100)}
										</div>
									</div>
									<div class="flex flex-wrap items-center gap-2">
										<Badge>Technology</Badge>
										<Badge variant="secondary"
											>{item.task_type === 1 ? 'Short ' : 'Long '} Term</Badge
										>
									</div>
								</Card.Content>
							</Card.Root> -->
						</div>
					{/each}
				{/if}
			</div>
		</Column>
	{/if}
{/each}
