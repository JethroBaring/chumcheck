<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Sparkles } from 'lucide-svelte';
	let { children, name, generate }: { children: any; name: string; generate: any } = $props();
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
	<Card.Header>
		<div class="flex h-4 items-center justify-between">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
			<button onclick={() => generate(name.slice(0, 1))}>
				<Sparkles class="h-4 w-4 text-flutter-blue" />
			</button>
		</div>
	</Card.Header>
	<Card.Content class="flex h-[700px] flex-col gap-3 overflow-scroll">
		{@render children()}
	</Card.Content>
</Card.Root>
