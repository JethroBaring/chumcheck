<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

	let { children, data } = $props();
</script>

<div class="flex flex-col gap-3 h-full">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/startups">Startups</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Alliance Tech</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<!-- <div class="flex items-center justify-between">
		<div>
			<h2 class="text-3xl font-bold">Alliance Tech</h2>
		</div>
	</div> -->
  {@render children()}
</div>
