<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  import { UsersRound, Settings } from 'lucide-svelte';
  let { children } = $props()
</script>
<Card.Root class="h-full">
  <Card.Header>
    <Card.Title class="text-2xl">Startup Settings</Card.Title>
  </Card.Header>
  <Card.Content class="grid w-full grid-cols-[250px_1fr] gap-14">
      <nav class="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
        <a href="##" class="rounded-lg bg-secondary p-2 px-4 font-semibold text-primary flex items-center gap-3"><Settings class="h-5 w-5"/> General</a>
        <a href="##" class="rounded-lg p-2 px-4 hover:bg-secondary/80 flex items-center gap-3"><UsersRound class="h-5 w-5"/> Members</a>
      </nav>
      {@render children()}
  </Card.Content>
</Card.Root>