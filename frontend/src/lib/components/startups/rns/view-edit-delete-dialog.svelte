<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { getReadinessLevels, getReadinessTypes } from '$lib/utils';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DeleteDialog } from '$lib/components/shared';
	import Header from '$lib/components/shared/header.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Check, Plus, Trash } from 'lucide-svelte';

	let {
		open,
		onOpenChange,
		rns,
		deleteRns,
		update,
		action,
		members,
		assignedMember,
		closeDialog,
		ai = false,
		addToRns
	} = $props();

	let rnsCopy = $state({ ...rns });

	const levels = $derived(
		getReadinessLevels(
			rns.readiness_type_id
				? (getReadinessTypes().filter((d) => d.id === Number(rns.readiness_type_id))[0].name as
						| 'Technology'
						| 'Market'
						| 'Acceptance'
						| 'Organizational'
						| 'Regulatory'
						| 'Investment')
				: 'Technology'
		)
	);

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});

	let editDescription = $state(false);

	let descriptionDiv: HTMLDivElement;

	$effect(() => {
		if (editDescription && descriptionDiv) {
			descriptionDiv.focus();
		}
	});

	$effect(() => {
		if (!open) {
			editDescription = false;
			action = 'View';
		}
	});

	let deleteDialogOpen = $state(false);
	const deleteDialogOnOpenChange = () => {
		deleteDialogOpen = !deleteDialogOnOpenChange;
	};
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="h-4/6 max-w-[1200px] overflow-scroll">
		<div class="flex gap-10">
			<div class="flex w-4/6 flex-col gap-5">
				<h1 class="text-2xl font-semibold">Priority #{rnsCopy.priority_number}</h1>
				<div class="flex flex-col gap-3">
					<Label for="username">Description</Label>
					{#if editDescription}
						<Textarea rows={12} bind:value={rnsCopy.description} class="text-justify text-base" />
						<!-- <div contenteditable="true" bind:this={descriptionDiv} class="focus:border-none active:border-none outline-red-500">{rnsCopy.description}</div> -->
						<div class="ml-auto flex gap-2">
							<Button variant="outline" onclick={() => (editDescription = false)}>Cancel</Button
							><Button
								onclick={async () => {
									await update(rnsCopy.id, { description: rnsCopy.description });
									editDescription = false;
								}}>Save</Button
							>
						</div>
					{:else}
						<button onclick={() => (editDescription = true)}>
							<div class="text-justify">
								{rnsCopy.description}
							</div>
						</button>
					{/if}
				</div>
			</div>
			<div class="flex h-fit flex-1 flex-col gap-3">
				<div class="flex gap-3">
					<Button size="sm" variant="destructive" onclick={() => (deleteDialogOpen = true)}
						><Trash class="h-4 w-4" /> Delete</Button
					>
					{#if ai}
						<Button size="sm" onclick={() => addToRns(rnsCopy.id)}
							><Check class="h-4 w-4" /> Add to RNS</Button
						>
					{/if}
				</div>
				<Card.Root class="rounded-md">
					<Card.Content class="p-0">
						<div class="flex flex-col">
							<div class="p-2">Details</div>
							<Separator />
							<div class="flex flex-col gap-2 p-2">
								<div class="flex h-9 items-center justify-between text-sm">
									<p class="w-[130px]">Readiness Type</p>
									<Select.Root type="single" bind:value={rnsCopy.readiness_type_id}>
										<Select.Trigger class="w-[200px] border-none"
											>{rnsCopy.readiness_type_id
												? getReadinessTypes().filter(
														(d) => d.id === Number(rnsCopy.readiness_type_id)
													)[0].name
												: ''}</Select.Trigger
										>
										<Select.Content class="border-none">
											{#each getReadinessTypes() as type}
												<Select.Item value={`${type.id}`}>{type.name}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>

								<div class="flex h-9 items-center justify-between text-sm">
									<p class="w-[130px]">Target Level</p>
									<Select.Root type="single" bind:value={rnsCopy.target_level_id}>
										<Select.Trigger class="w-[200px] border-none"
											>{rnsCopy.target_level_id}</Select.Trigger
										>
										<Select.Content class="border-none">
											{#each levels as item}
												<Select.Item value={`${item.id}`}>{item.level}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
								<div class="flex h-9 items-center justify-between text-sm">
									<p class="w-[130px]">Term</p>
									<Select.Root
										type="single"
										bind:value={rnsCopy.task_type}
										onValueChange={() => {
											update(rnsCopy.id, { task_type: rnsCopy.task_type });
										}}
									>
										<Select.Trigger class="w-[200px] border-none"
											>{rnsCopy.task_type === '1' ? 'Short Term' : 'Long Term'}</Select.Trigger
										>
										<Select.Content class="border-none">
											<Select.Item value="1">Short Term</Select.Item>
											<Select.Item value="2">Long Term</Select.Item>
										</Select.Content>
									</Select.Root>
								</div>
								<div class="flex h-9 items-center justify-between text-sm">
									<p class="w-[130px]">Assignee</p>
									<Select.Root
										type="single"
										bind:value={rnsCopy.assignee_id}
										onValueChange={() => {
											update(rnsCopy.id, { assignee_id: rnsCopy.assignee_id });
										}}
									>
										<Select.Trigger class="w-[200px] border-none"
											>{rnsCopy.assignee_id
												? `${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].first_name} ${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].last_name}`
												: 'None'}</Select.Trigger
										>
										<Select.Content class="border-none">
											{#each members as member}
												<Select.Item value={member.user_id}
													>{member.first_name} {member.last_name}</Select.Item
												>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
<DeleteDialog
	open={deleteDialogOpen}
	onOpenChange={deleteDialogOnOpenChange}
	{rns}
	deleteAction={deleteRns}
	name="Rns"
	{closeDialog}
/>
