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
		risk_number: '',
		description: '',
		fix: '',
		assignee_id: null,
		startup_id: startupId,
		is_ai_generated: false,
		status: 4
	});
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Create</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="flex flex-col gap-4">
				<Label for="username">Description</Label>
				<Textarea rows={4} bind:value={data.description} />
			</div>
			<div class="flex flex-col gap-4">
				<Label for="username">Fix</Label>
				<Textarea rows={4} bind:value={data.fix} />
			</div>
		</div>
		<div class="flex flex-col gap-4">
			<Label for="name">Assignee</Label>
			<Select.Root type="single">
				<Select.Trigger class="w-[180px]"></Select.Trigger>
				<Select.Content>
					<Select.Item value="light">Technology</Select.Item>
					<Select.Item value="dark">Market</Select.Item>
					<Select.Item value="system">Acceptance</Select.Item>
					<Select.Item value="system">Regulatory</Select.Item>
					<Select.Item value="system">Organizational</Select.Item>
					<Select.Item value="system">Investment</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="text-sm text-muted-foreground">
			Risk Number: <DropdownMenu.Root>
				<DropdownMenu.Trigger><Badge variant="secondary">5</Badge></DropdownMenu.Trigger>
				<DropdownMenu.Content align="start" class="min-w-4">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup bind:value={data.risk_number}>
							{#each [1, 2, 3, 4, 5] as item}
								<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<Dialog.Footer>
			<Button onclick={() => create(data)}>Create</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
