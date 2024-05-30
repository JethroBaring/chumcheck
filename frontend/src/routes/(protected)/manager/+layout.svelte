<script lang="ts">
    import Sidebar from "$lib/components/shared/Sidebar.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import { toggleMode } from 'mode-watcher';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Users from 'lucide-svelte/icons/users';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import { goto } from '$app/navigation'

    function handleUrl(status:string) {
		goto(`/manager/${status}`)
	}
</script>

<Toaster />
<div class="flex w-full bg-muted/40">
    <Sidebar />
    <slot />
</div>