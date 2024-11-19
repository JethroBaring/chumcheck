<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	let { children, name }: { children: any; name: string } = $props();
	let hover = $state(false);
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]" onmouseenter={() => hover = true} onmouseleave={() => hover = false}>
	<Card.Header>
		<div class="flex items-center justify-between h-4">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
			{#if hover}
				<button>
					<Plus class="h-4 w-4" />
				</button>
			{/if}
		</div>
	</Card.Header>
	<Card.Content>
		{@render children()}
	</Card.Content>
</Card.Root>
