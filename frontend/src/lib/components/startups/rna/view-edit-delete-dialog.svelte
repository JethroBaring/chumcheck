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
	let { open, onOpenChange, rns, deleteRns, update, action } = $props();

	let rnsCopy = $state({ ...rns });

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});
</script>

{#if action === 'Delete'}
	<AlertDialog.Root bind:open {onOpenChange}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete this task.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action
					onclick={() => {
						deleteRns(rns.id);
					}}>Continue</AlertDialog.Action
				>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{:else}
	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="max-w-[600px]">
			<div class="grid gap-4 py-4">
				<div class="flex flex-col gap-4">
					<Label for="name">Type</Label>
					<Select.Root type="single" bind:value={rnsCopy.readiness_type_id}>
						<Select.Trigger class="w-[180px]" disabled={action === 'View'}
							>{rnsCopy.readiness_type_id
								? getReadinessTypes().filter((d) => d.id === Number(rnsCopy.readiness_type_id))[0]
										.name
								: ''}</Select.Trigger
						>
						<Select.Content>
							{#each getReadinessTypes() as type}
								<Select.Item value={`${type.id}`}>{type.name}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex flex-col gap-4">
					<Label for="username">Description</Label>
					<Textarea rows={10} bind:value={rnsCopy.rna} readonly={action === 'View'} />
				</div>
			</div>
			{#if action === 'Edit'}
				<Dialog.Footer>
					<Button onclick={() => update(rnsCopy.id, rnsCopy.rna)}>Update</Button>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}