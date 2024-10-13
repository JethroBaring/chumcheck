<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Gemini from '$lib/components/icons/Gemini.svelte';
	import { DotsHorizontal } from 'svelte-radix';
	import { Badge } from '$lib/components/ui/badge';
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
  <Card.Header>
    <div class="flex items-center justify-between">
      <h2 class="font-semibold leading-none tracking-tight">Market</h2>
      <DotsHorizontal class="h-4 w-4" />
    </div>
    <div>
      <h2 class="text-sm">Hello World</h2>
    </div>
  </Card.Header>
  <Card.Content>
    
  </Card.Content>
  <Card.Footer>
    <Badge>Technology</Badge>
  </Card.Footer>
</Card.Root>