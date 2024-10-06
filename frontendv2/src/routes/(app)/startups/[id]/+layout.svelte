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
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-3xl font-bold">Alliance Tech</h2>
		</div>
	</div>
	<div class="flex justify-between">
    <Tabs.Root value={data.pathname} class="">
      <Tabs.List class="grid grid-cols-5">
        <a
          href={`/startups/${data.id}/readiness_level`}
          class={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-[6px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            data.pathname === 'readiness_level' && 'bg-background text-foreground shadow'
          )}>Readiness Level</a
        >
        <a
          href={`/startups/${data.id}/rna`}
          class={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-[6px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            data.pathname === 'rna' && 'bg-background text-foreground shadow'
          )}>RNA</a
        >
        <a
          href={`/startups/${data.id}/rns`}
          class={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-[6px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            data.pathname === 'rns' && 'bg-background text-foreground shadow'
          )}>RNS</a
        >
        <a
          href={`/startups/${data.id}/initiatives`}
          class={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-[6px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            data.pathname === 'initiatives' && 'bg-background text-foreground shadow'
          )}>Initiatives</a
        >
        <a
          href={`/startups/${data.id}/roadblocks`}
          class={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-[6px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            data.pathname === 'roadblocks' && 'bg-background text-foreground shadow'
          )}>Roadblocks</a
        >
      </Tabs.List>
    </Tabs.Root>
  </div>
  {@render children()}
</div>
