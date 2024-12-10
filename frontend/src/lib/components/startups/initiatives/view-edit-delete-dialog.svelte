<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DeleteDialog } from '$lib/components/shared';

	let { open, onOpenChange, rns, deleteRns, update, action, members, assignedMember, closeDialog, tasks } = $props();

	let rnsCopy = $state({ ...rns });

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});

</script>

{#if action === 'Delete'}
<DeleteDialog {open} {onOpenChange} {rns} deleteAction={deleteRns} name="Initiative" {closeDialog}/>
{:else}
	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="max-w-[600px] h-4/5 overflow-scroll">
			<div class="grid gap-4 py-4">
				<div class="flex flex-col gap-4">
					<Label for="name">Task</Label>
					<Select.Root type="single" bind:value={rnsCopy.task_id}>
					<Select.Trigger class="h-20 text-wrap text-start"
						>
						{tasks.filter((task: any) => task.id == rnsCopy.task_id)[0].description.substring(0, 100)}
						</Select.Trigger
					>
					<Select.Content>
						{#each tasks as task}
							<Select.Item class="" value={`${task.id}`}>{task.description.substring(0,90)}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Description</Label>
					<Textarea rows={4} bind:value={rnsCopy.description} readonly={action === 'View'} />
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Measures</Label>
					<Textarea rows={2} bind:value={rnsCopy.measures} readonly={action === 'View'} />
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Target</Label>
					<Textarea rows={2} bind:value={rnsCopy.targets} readonly={action === 'View'} />
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Remarks</Label>
					<Textarea rows={2} bind:value={rnsCopy.remarks} readonly={action === 'View'} />
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="name">Assignee</Label>
				<Select.Root type="single" bind:value={rnsCopy.assignee_id}>
					<Select.Trigger class="w-[180px]" disabled={action === 'View'}
						>{rnsCopy.assignee_id
							? `${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].first_name} ${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].last_name}`
							: ''}</Select.Trigger
					>
					<Select.Content>
						{#each members as member}
							<Select.Item value={member.user_id}
								>{member.first_name} {member.last_name}</Select.Item
							>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="name">Initiative No.</Label>
				<Select.Root type="single" bind:value={rnsCopy.initiative_number}>
					<Select.Trigger class="w-[180px]">{rnsCopy.initiative_number}</Select.Trigger>
					<Select.Content>
						{#each [1, 2, 3, 4, 5] as item}
							<Select.Item value={`${item}`}>{item}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			{#if action === 'Edit'}
				<Dialog.Footer>
					<Button
						onclick={async () => {
							await update(
								rnsCopy.id,
								rnsCopy.description,
								rnsCopy.measures,
								rnsCopy.targets,
								rnsCopy.remarks,
								rnsCopy.initiative_number,
								rnsCopy.assignee_id
							)
							closeDialog()
						}
						}
						disabled={rnsCopy.description === '' || rnsCopy.measures === '' || rnsCopy.targets === '' || rnsCopy.remarks === ''}
						>Update</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}
