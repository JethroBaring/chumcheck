<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import { toggleMode } from 'mode-watcher';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Users from 'lucide-svelte/icons/users';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	let x  = [1,2,3,4]

</script>

<div class="flex items-center">
	<h1 class="text-lg font-semibold md:text-2xl">Roadblocks</h1>
</div>
<div class="flex flex-1 flex-col">

			<Card.Root
				data-x-chunk-name="dashboard-06-chunk-1"
				data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
			>
				<Card.Content class="pt-[24px] ">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Risk number</Table.Head>
								<Table.Head>Description</Table.Head>
								<Table.Head>Fix/Mitigation</Table.Head>
								<Table.Head>Assignee</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each x as item}
							<Table.Row class="h-[80px]">
								<Table.Cell class="font-medium">Laser Lemonade</Table.Cell>
								<Table.Cell>$499.99</Table.Cell>
								<Table.Cell>
									<Badge variant="outline">Pending</Badge>
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">Jethro Baring</Table.Cell>
							</Table.Row>
							{/each}
							
						</Table.Body>
					</Table.Root>
				</Card.Content>
			</Card.Root>
</div>