<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import {
		getProfileColor,
		getReadinessLevels,
		getReadinessTypes,
		getStatusName,
		zIndex
	} from '$lib/utils';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	let { open, onOpenChange, create, members, startupId, status } = $props();

	const data = $state({
		description: '',
		fix: '',
		assignee_id: '',
		startup_id: startupId,
		is_ai_generated: false,
		status: 4
	});
</script>

<Dialog.Root bind:open {onOpenChange}>
	<Dialog.Content class="max-w-[600px]  h-4/5 overflow-scroll">
		<Dialog.Header>
			<Dialog.Title>Create {getStatusName(status)} Initiative</Dialog.Title>
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
		<Dialog.Footer>
			<Button onclick={() => create(data)} disabled={data.description === '' || data.fix === ''}
				>Create</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
