<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis } from 'lucide-svelte';
	let { rns,  } = $props();
	let hover = $state(false);
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<Card.Content>
		<div class="flex flex-col gap-1">
			<div class="flex items-center justify-between">
				<h2 class="text-[15px] font-semibold leading-none tracking-tight">
					Technology
				</h2>

			</div>
			<div class="text-sm text-muted-foreground">
				{rns.rns.substring(0, 150) + `${rns.rns.length > 150 ? '...' : ''}`}
			</div>
			<div class="text-sm text-muted-foreground">
				Target Level: 5
			</div>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary"
				>Long Term</Badge
			>
		</div>
		{rns.rns.substring(0, 150) + `${rns.rns.length > 150 ? '...' : ''}`}
	</Card.Content>
</Card.Root>