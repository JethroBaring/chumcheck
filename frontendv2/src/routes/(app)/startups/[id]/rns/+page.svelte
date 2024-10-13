<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { MixerHorizontal, MagicWand, DotsHorizontal } from 'svelte-radix';
	import { WandSparkles } from 'lucide-svelte';

	import { cn } from '$lib/utils';
	import Gemini from '$lib/components/icons/Gemini.svelte';
	import Task from '$lib/components/app/rns/Task.svelte';
	const cards = ['To Do', 'In Progress', 'Done'];
</script>

<div class="flex">
	<div class="flex justify-between rounded-lg bg-background">
		<Tabs.Root value="account">
			<Tabs.List class="border bg-flutter-gray/20">
				<Tabs.Trigger value="account">Startup RNS</Tabs.Trigger>
				<Tabs.Trigger value="password">AI Generated RNS</Tabs.Trigger>
			</Tabs.List>
			<!-- <Tabs.Content value="account">
				Make changes to your account here.
			</Tabs.Content>
			<Tabs.Content value="password">Change your password here.</Tabs.Content> -->
		</Tabs.Root>
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				variant="outline"
				class="ml-auto hidden rounded-lg lg:flex"
				builders={[builder]}
			>
				<MixerHorizontal class="mr-2 h-4 w-4" />
				View
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
			<DropdownMenu.Separator />
			{#each cards as card}
				<DropdownMenu.CheckboxItem>
					{card}
				</DropdownMenu.CheckboxItem>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<!-- <Button
				variant="outline"
				class="ml-auto hidden h-9 rounded-lg lg:flex gap-2"
			>
				<Gemini />
				Generate
			</Button> -->
	<!-- <div class="bg-background ml-auto">
		<Button
				variant="outline"
				size="sm"
				class="ml-auto hidden h-9 rounded-lg lg:flex gap-2 bg-flutter-gray/20"
			>
				<Gemini />
				Generate
			</Button>
	</div> -->
</div>
<div class="flex h-full gap-5 overflow-scroll">
	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold leading-none tracking-tight">Technology</h2>
				<Gemini />
			</div>
		</Card.Header>
		<Card.Content>
			<Task />
		</Card.Content>
	</Card.Root>

	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold leading-none tracking-tight">Regulatory</h2>
				<Gemini />
			</div>
		</Card.Header>
		<Card.Content></Card.Content>
	</Card.Root>
	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold leading-none tracking-tight">Acceptance</h2>
				<Gemini />
			</div>
		</Card.Header>
		<Card.Content></Card.Content>
	</Card.Root>
	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold leading-none tracking-tight">Organizational</h2>
				<Gemini />
			</div>
		</Card.Header>
		<Card.Content></Card.Content>
	</Card.Root>
	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
		<Card.Header>
			<div class="flex items-center justify-between">
				<h2 class="font-semibold leading-none tracking-tight">Investment</h2>
				<Gemini />
			</div>
		</Card.Header>
		<Card.Content></Card.Content>
	</Card.Root>
</div>
