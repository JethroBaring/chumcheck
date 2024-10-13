<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { MixerHorizontal } from 'svelte-radix';
	import { cn } from '$lib/utils';

	const cards = ['To Do', 'In Progress', 'Done'];
</script>

<div class="flex">
	<div class="flex justify-between bg-background rounded-lg">
    <Tabs.Root value="account">
			<Tabs.List class="bg-flutter-gray/20 border">
				<Tabs.Trigger value="account">Readiness Level</Tabs.Trigger>
				<Tabs.Trigger value="password">Progress Report</Tabs.Trigger>
			</Tabs.List>
			<!-- <Tabs.Content value="account">
				Make changes to your account here.
			</Tabs.Content>
			<Tabs.Content value="password">Change your password here.</Tabs.Content> -->
		</Tabs.Root>
  </div>
</div>
<Card.Root class="h-full">
  <Card.Header>
    <Card.Title class="text-2xl">Readiness Level</Card.Title>
    <Card.Description>Card Description</Card.Description>
  </Card.Header>
  <Card.Content>
    
  </Card.Content>
</Card.Root>