<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { getProfileColor, getReadinessLevels, getReadinessTypes, zIndex } from '$lib/utils';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	let { open, onOpenChange, create, members, startupId } = $props();

	const data = $state({
		priority_number: null,
		readiness_type_id: '',
		target_level_id: '',
		target_level_score_id: 1,
		description: '',
		status: 4,
		startup_id: startupId,
		task_type: '1',
		due_date: null,
		is_ai_generated: false,
		assignee_id: ''
	});

	const levels = $derived(
		getReadinessLevels(
			data.readiness_type_id
				? (getReadinessTypes().filter((d) => d.id === Number(data.readiness_type_id))[0].name as
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
		console.log(levels);
	});
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Create</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-4">
				<Label for="name">Type</Label>
				<Select.Root type="single" bind:value={data.readiness_type_id}>
					<Select.Trigger class="w-[180px]"
						>{data.readiness_type_id
							? getReadinessTypes().filter((d) => d.id === Number(data.readiness_type_id))[0].name
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
				<Textarea rows={10} bind:value={data.description} />
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<Label for="name">Assignee</Label>
			<Select.Root type="single" bind:value={data.assignee_id}>
				<Select.Trigger class="w-[180px]"
					>{data.assignee_id
						? `${members.filter((member: any) => member.user_id === data.assignee_id)[0].first_name} ${members.filter((member: any) => member.user_id === data.assignee_id)[0].last_name}`
						: ''}</Select.Trigger
				>
				<Select.Content>
					{#each members as member}
						<Select.Item value={member.user_id}>{member.first_name} {member.last_name}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex flex-col gap-4">
			<Label for="name">Target Level</Label>
			<Select.Root type="single" bind:value={data.target_level_id}>
				<Select.Trigger class="w-[50px]">{data.target_level_id}</Select.Trigger>
				<Select.Content>
					{#each levels as item}
						<Select.Item value={`${item.id}`}>{item.level}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<!-- <div class="text-sm text-muted-foreground">
			Target Level: <DropdownMenu.Root>
				<DropdownMenu.Trigger><Badge variant="secondary">{data.target_level_id ? levels.filter((level) => level.id === Number(data.target_level_id))[0].level : '1' }</Badge></DropdownMenu.Trigger>
				<DropdownMenu.Content align="start" class="min-w-4">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup bind:value={data.target_level_id}>
							{#each levels as item}
								<DropdownMenu.RadioItem value={`${item.id}`}>{item.level}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div> -->
		<div class="flex flex-col gap-4">
			<Label for="name">Term</Label>
			<Select.Root type="single" bind:value={data.task_type}>
				<Select.Trigger class="w-[120px]"
					>{data.task_type === '1' ? 'Short Term' : 'Long Term'}</Select.Trigger
				>
				<Select.Content>
					<Select.Item value="1">Short Term</Select.Item>
					<Select.Item value="2">Long Term</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<!-- <div class="flex items-center justify-between">
			<div class="text-sm text-muted-foreground">
				Term: <DropdownMenu.Root>
					<DropdownMenu.Trigger
						><Badge variant="secondary">{data.task_type === '1' ? 'Short Term' : 'Long Term'}</Badge
						></DropdownMenu.Trigger
					>
					<DropdownMenu.Content align="start">
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup bind:value={data.task_type}>
								<DropdownMenu.RadioItem value="1">Short Term</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="2">Long Term</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div> -->
		<Dialog.Footer>
			<Button onclick={() => create(data)}>Create</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
