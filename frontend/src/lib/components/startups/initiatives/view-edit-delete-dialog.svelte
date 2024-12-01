<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { getProfileColor, zIndex } from '$lib/utils';

	let { open, onOpenChange, rns, deleteRns, update, action, members, assignedMember } = $props();

	let rnsCopy = $state(rns);
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
			<Dialog.Header>
				<Dialog.Title>{rnsCopy.readiness_type_rl_type}</Dialog.Title>
			</Dialog.Header>
			<Textarea
				bind:value={rnsCopy.description}
				rows={10}
				class="resize-none border-none p-0 text-lg focus:outline-none focus:ring-0"
				readonly={action === 'View'}
			/>
			<div class="text-sm text-muted-foreground">
				Target Level: <DropdownMenu.Root>
					<DropdownMenu.Trigger><Badge variant="secondary">5</Badge></DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="min-w-4">
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup>
								{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item}
									<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
								{/each}
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex flex-wrap items-center gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger><Badge variant="secondary">Long Term</Badge></DropdownMenu.Trigger
						>
						<DropdownMenu.Content align="start">
							<DropdownMenu.Group>
								<DropdownMenu.RadioGroup>
									<DropdownMenu.RadioItem value="short">Short Term</DropdownMenu.RadioItem>
									<DropdownMenu.RadioItem value="long">Long Term</DropdownMenu.RadioItem>
								</DropdownMenu.RadioGroup>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#if assignedMember}
							<div class="flex items-center gap-2">
								{assignedMember.first_name}
								{assignedMember.last_name}
								<div
									class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
								>
									{assignedMember.first_name.charAt(0)}
								</div>
							</div>
						{:else}
							<div class={`flex h-8 w-8 items-center justify-center rounded-full ${zIndex[1]}`}>
								?
							</div>
						{/if}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Group>
							{#each members as member, index}
								<DropdownMenu.RadioGroup
									bind:value={rns.assignee_id}
									onValueChange={(v) => update(rns.id, undefined, undefined, undefined, v)}
								>
									<DropdownMenu.RadioItem value={member.user_id} class="flex items-center gap-3">
										<div
											class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(member.first_name)}`}
										>
											{member.first_name.charAt(0)}
										</div>
										{member.first_name}
										{member.last_name}
									</DropdownMenu.RadioItem>
								</DropdownMenu.RadioGroup>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			{#if action === 'Edit'}
				<Dialog.Footer>
					<Button>Update</Button>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}