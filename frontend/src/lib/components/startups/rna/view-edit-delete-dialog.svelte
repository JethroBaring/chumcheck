<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { getProfileColor, getReadinessTypes, zIndex } from '$lib/utils';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DeleteDialog } from '$lib/components/shared';
	let { open, onOpenChange, rns, deleteRns, update, action, readinessData, closeDialog } = $props();

	let rnsCopy = $state({ ...rns });

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});
</script>

{#if action === 'Delete'}
	<DeleteDialog {open} {onOpenChange} {rns} deleteAction={deleteRns} name="Rna" {closeDialog}/>
{:else}
	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="max-w-[600px]">
			<div class="grid gap-4 py-4">
				<div class="flex flex-col gap-4">
					<Label for="name">Type</Label>
					<Select.Root type="single">
						<Select.Trigger class="w-[180px]" disabled={action === 'View'}>
							{rnsCopy.readiness_type_rl_type}
						</Select.Trigger>
					</Select.Root>
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Description</Label>
					<Textarea rows={10} bind:value={rnsCopy.rna} readonly={action === 'View'} />
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="name">Curent Level</Label>
				<Select.Root type="single">
					<Select.Trigger class="w-[50px]">{rnsCopy.readiness_level_level}</Select.Trigger>
				</Select.Root>
			</div>
			{#if action === 'Edit'}
				<Dialog.Footer>
					<Button
						onclick={async () => {
							await update(rnsCopy.id, rnsCopy.rna);
							open = false;
						}}
						disabled={rnsCopy.rna === ''}
						>Update</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}
