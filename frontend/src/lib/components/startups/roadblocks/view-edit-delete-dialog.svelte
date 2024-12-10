<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { getProfileColor, zIndex } from '$lib/utils';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DeleteDialog } from '$lib/components/shared';
	let { open, onOpenChange, rns, deleteRns, update, action, members, assignedMember, closeDialog } = $props();

	let rnsCopy = $state({ ...rns });

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});
</script>

{#if action === 'Delete'}
	<DeleteDialog {open} {onOpenChange} {rns} deleteAction={deleteRns} name="Roadblocks" {closeDialog}/>
{:else}
	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="max-w-[600px] h-4/5 overflow-scroll">
			<div class="grid gap-4 py-4">
				<div class="flex flex-col gap-4">
					<Label for="username">Description</Label>
					<Textarea rows={4} bind:value={rnsCopy.description} />
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Fix</Label>
					<Textarea rows={4} bind:value={rnsCopy.fix} />
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
				<Label for="name">Risk No.</Label>
				<Select.Root type="single" bind:value={rnsCopy.risk_number}>
					<Select.Trigger class="w-[50px]">{rnsCopy.risk_number}</Select.Trigger>
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
								rnsCopy.risk_number,
								rnsCopy.description,
								rnsCopy.fix,
								rnsCopy.assignee_id
							);
							closeDialog()
						}}
						disabled={rnsCopy.description === '' || rnsCopy.fix === ''}
						>Update</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}
