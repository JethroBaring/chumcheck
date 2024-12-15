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
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Trash } from 'lucide-svelte';
	import Check from 'svelte-radix/Check.svelte';
	let {
		open,
		onOpenChange,
		rns,
		deleteRns,
		update,
		action,
		readinessData,
		closeDialog,
		ai = false,
		addToRna
	} = $props();

	let rnsCopy = $state({ ...rns });

	$effect(() => {
		if (!open) {
			rnsCopy = { ...rns };
		}
	});

	let editDescription = $state(false);
	
	let deleteDialogOpen = $state(false);
	const deleteDialogOnOpenChange = () => {
		deleteDialogOpen = !deleteDialogOnOpenChange;
	};
</script>

	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="h-4/6 max-w-[1200px] overflow-scroll">
			<div class="flex gap-10">
				<div class="flex w-4/6 flex-col gap-5">
					<h1 class="text-2xl font-semibold">{rnsCopy.readiness_type_rl_type}</h1>
					<div class="flex flex-col gap-3">
						<Label for="username">Description</Label>
						{#if editDescription}
							<Textarea rows={12} bind:value={rnsCopy.rna} class="text-justify text-base" />
							<div class="ml-auto flex gap-2">
								<Button variant="outline" onclick={() => (editDescription = false)}>Cancel</Button
								><Button
									onclick={async () => {
										await update(rnsCopy.id, rnsCopy.rna);
										editDescription = false;
									}}>Save</Button
								>
							</div>
						{:else}
							<button onclick={() => (editDescription = true)}>
								<div class="text-justify">
									{rnsCopy.rna}
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
							<Button size="sm" onclick={() => addToRna(rnsCopy.id)}
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
										<p class="w-[130px]">Current Level</p>
										<p class="w-[200px] p-3">{rnsCopy.readiness_level_level}</p>
									</div>
								</div>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</Dialog.Content>
	</Dialog.Root>
	<DeleteDialog open={deleteDialogOpen} onOpenChange={deleteDialogOnOpenChange} {rns} deleteAction={deleteRns} name="Rna" {closeDialog} />

