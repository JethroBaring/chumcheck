<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import type { PageData } from '../$types.js';

	let { children, data } = $props()
</script>

<div class="flex flex-col gap-3 h-full">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/startups">Startups</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<!-- <Breadcrumb.Page>{data.info.name}</Breadcrumb.Page> -->
				<Breadcrumb.Page>FinEdge Tech</Breadcrumb.Page>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<!-- <Breadcrumb.Page>{data.info.name}</Breadcrumb.Page> -->
				<Breadcrumb.Page>Initiatives</Breadcrumb.Page>
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
