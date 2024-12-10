<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textareav2';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { getReadinessLevels, getReadinessTypes } from '$lib/utils';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DeleteDialog } from '$lib/components/shared';

	let { open, onOpenChange, rns, deleteRns, update, action, members, assignedMember, closeDialog } = $props();

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
</script>

{#if action === 'Delete'}
	<DeleteDialog {open} {onOpenChange} {rns} deleteAction={deleteRns} name="Rns" {closeDialog} />
{:else}
	<Dialog.Root bind:open {onOpenChange}>
		<Dialog.Content class="max-w-[600px] h-4/5 overflow-scroll">
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
					<Textarea rows={10} bind:value={rnsCopy.description} readonly={action === 'View'} />
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
				<Label for="name">Priority Number</Label>
				<Select.Root type="single" bind:value={rnsCopy.priority_number}>
					<Select.Trigger class="w-[50px]" disabled={action === 'View'}
						>{rnsCopy?.priority_number}</Select.Trigger
					>
					<Select.Content>
						{#each [1,2,3,4,5] as item}
							<Select.Item value={`${item}`}>{item}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="name">Target Level</Label>
				<Select.Root type="single" bind:value={rnsCopy.target_level_id}>
					<Select.Trigger class="w-[50px]" disabled={action === 'View'}
						>{rnsCopy.target_level_id}</Select.Trigger
					>
					<Select.Content>
						{#each levels as item}
							<Select.Item value={`${item.id}`}>{item.level}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex flex-col gap-4">
				<Label for="name">Term</Label>
				<Select.Root type="single" bind:value={rnsCopy.task_type}>
					<Select.Trigger class="w-[120px]" disabled={action === 'View'}
						>{rnsCopy.task_type === '1' ? 'Short Term' : 'Long Term'}</Select.Trigger
					>
					<Select.Content>
						<Select.Item value="1">Short Term</Select.Item>
						<Select.Item value="2">Long Term</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			{#if action === 'Edit'}
				<Dialog.Footer>
					<Button
						onclick={async () => {
							await update(
								rnsCopy.id,
								rnsCopy.target_level_id,
								rnsCopy.description,
								rnsCopy.priority_number,
								rnsCopy.assignee_id
							);
							closeDialog()
						}}
						disabled={rnsCopy.description === ''}
						>Update</Button
					>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>

	<!-- <Dialog.Root bind:open {onOpenChange}>
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
	</Dialog.Root> -->
{/if}
