<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Plus } from 'lucide-svelte';
	let { children, name, showDialog }: { children: any; name: string; showDialog: any } = $props();
	let hover = $state(false);
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)]"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<Card.Header>
		<div class="flex h-4 items-center justify-between">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
			<button onclick={showDialog}>
				<Plus class="h-4 w-4" />
			</button>
		</div>
	</Card.Header>
	<Card.Content class="flex h-[730px] flex-col gap-3 overflow-scroll">
		{@render children()}
	</Card.Content>
</Card.Root>
