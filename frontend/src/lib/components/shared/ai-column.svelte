<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Sparkles } from 'lucide-svelte';
  let { children, name, generate } : { children: any, name: string, generate: any } = $props()

  let hover = $state(false)
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]"
onmouseenter={() => (hover = true)}
onmouseleave={() => (hover = false)}
>
  <Card.Header>
    <div class="flex items-center justify-between h-4">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
      {#if hover}
      <button onclick={() => generate(name.slice(0, 1))}>
        <Sparkles class="h-4 w-4 text-flutter-blue" />
      </button>
      {/if}
    </div>
  </Card.Header>
  <Card.Content class="flex flex-col gap-3">
    {@render children()}
  </Card.Content>
</Card.Root>