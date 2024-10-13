<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { RocketIcon } from 'lucide-svelte';
	import * as Dialog from "$lib/components/ui/dialog";
	import Application from '$lib/components/startup/Application.svelte';
	import Gemini from '$lib/components/icons/Gemini.svelte';

	let showApplicationForm = $state(false)

	const toggleApplicationForm = () => {
		showApplicationForm = !showApplicationForm
	}
</script>

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold">Startups</h2>
		<p class="text-muted-foreground">Manage your startups</p>
	</div>
	<div class="flex gap-5">
		<Button class="rounded-lg flex gap-2 items-center justify-center" onclick={toggleApplicationForm}><RocketIcon class="h-4 w-4" /> Apply</Button>
	</div>
</div>

<div class="grid grid-cols-3 gap-3 mt-3">
	{#each [1, 2, 3] as item}
		<a href="/startups/12312/readiness_level">
      <Card.Root class="h-40 hover:bg-secondary cursor-pointer">
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Card Content</p>
        </Card.Content>
      </Card.Root>
    </a>
	{/each}
</div>

<div class="flex flex-1 items-center justify-center">
	<img src="/empty.svg" alt="empty" class="h-[250px] w-[250px]" />
</div>

<Dialog.Root open={showApplicationForm} onOpenChange={toggleApplicationForm}>
  <Dialog.Content class="h-4/5 max-w-[700px]">
    <Application />
  </Dialog.Content>
</Dialog.Root>