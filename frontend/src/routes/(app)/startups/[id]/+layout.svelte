<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { getData } from '$lib/utils';
	import { useQuery } from '@sveltestack/svelte-query';

	const { children, data } = $props()
	const { access, startupId } = data

	const startupQuery = useQuery(
		'startupData',
		() => getData(`/startups/${startupId}`, access!)
	);

	const info: any = $derived($startupQuery.isSuccess ? $startupQuery.data : {})
</script>

<div class="flex flex-col gap-3 h-full">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/startups">Startups</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{info.name}</Breadcrumb.Page>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Initiatives</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-3xl font-bold">{info.name}</h2>
		</div>
	</div>
  {@render children()}
</div>
