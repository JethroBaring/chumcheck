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
    <div class="grid min-h-screen w-full">
        <div class="flex w-full flex-col bg-muted/40">
            <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet.Root>
                    <Sheet.Trigger asChild let:builder>
                        <Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
                            <Menu class="h-5 w-5" />
                            <span class="sr-only">Toggle navigation menu</span>
                        </Button>
                    </Sheet.Trigger>
                    <Sheet.Content side="left" class="flex flex-col">
                        <nav class="grid gap-2 text-lg font-medium">
                            <a href="##" class="flex items-center gap-2 text-lg font-semibold">
                                <Package2 class="h-6 w-6" />
                                <span class="sr-only">Acme Inc</span>
                            </a>
                            <a
                                href="##"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Home class="h-5 w-5" />
                                Dashboard
                            </a>
                            <a
                                href="##"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                            >
                                <ShoppingCart class="h-5 w-5" />
                                Orders
                                <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </a>
                            <a
                                href="##"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Package class="h-5 w-5" />
                                Products
                            </a>
                            <a
                                href="##"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <Users class="h-5 w-5" />
                                Customers
                            </a>
                            <a
                                href="##"
                                class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <LineChart class="h-5 w-5" />
                                Analytics
                            </a>
                        </nav>
                    </Sheet.Content>
                </Sheet.Root>
    
                <p class="font-semibold">Startups</p>
                <div class="relative ml-auto flex-1 md:grow-0">
                    <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                    />
                </div>
                <Button
                    on:click={toggleMode}
                    variant="ghost"
                    size="icon"
                    class="hover:bg-transparent hover:text-flutter-blue"
                >
                    <Sun
                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild let:builder>
                        <Button
                            builders={[builder]}
                            variant="outline"
                            size="icon"
                            class="overflow-hidden rounded-full"
                        >
                            <img
                                src="/images/placeholder.jpg"
                                width={36}
                                height={36}
                                alt="Avatar"
                                class="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end">
                        <DropdownMenu.Label>My Account</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>Settings</DropdownMenu.Item>
                        <DropdownMenu.Item>Support</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <form action="/logout" method="post">
                            <button type="submit"> <DropdownMenu.Item>Logout</DropdownMenu.Item> </button>
                        </form>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </header>
            <main class="flex flex-1 flex-col gap-3 p-4 lg:p-6 lg:pb-4">
                <Tabs.Root value="pending" class="">
                    <div class="flex items-center">
                        <Tabs.List>
                            <button on:click={() => handleUrl("pending")}>
                                <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
                            </button>
                            <button on:click={() => handleUrl("rated")}>
                                <Tabs.Trigger value="rated">Rated</Tabs.Trigger>
                            </button>
                            <button on:click={() => handleUrl("qualified")}>
                                <Tabs.Trigger value="accepted">Accepted</Tabs.Trigger>
                            </button>
                        </Tabs.List>
                        <div class="ml-auto flex items-center gap-2">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild let:builder>
                                    <Button builders={[builder]} variant="outline" size="sm" class="h-7 gap-1">
                                        <ListFilter class="h-3.5 w-3.5" />
                                        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="end">
                                    <DropdownMenu.Label>Filter by</DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
                                    <DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
                                    <DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <Button size="sm" class="h-7 gap-1">
                                <CirclePlus class="h-3.5 w-3.5" />
                                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Accept All </span>
                            </Button>
                        </div>
                    </div>
                    <slot />
                </Tabs.Root>
                <!-- <Pagination.Root {count} {perPage} {siblingCount} let:pages let:currentPage class="flex items-end">
                    <Pagination.Content>
                      <Pagination.Item>
                        <Pagination.PrevButton>
                          <ChevronLeft class="h-4 w-4" />
                          <span class="hidden sm:block">Previous</span>
                        </Pagination.PrevButton>
                      </Pagination.Item>
                      {#each pages as page (page.key)}
                        {#if page.type === "ellipsis"}
                          <Pagination.Item>
                            <Pagination.Ellipsis />
                          </Pagination.Item>
                        {:else}
                          <Pagination.Item>
                            <Pagination.Link {page} isActive={currentPage === page.value}>
                              {page.value}
                            </Pagination.Link>
                          </Pagination.Item>
                        {/if}
                      {/each}
                      <Pagination.Item>
                        <Pagination.NextButton>
                          <span class="hidden sm:block">Next</span>
                          <ChevronRight class="h-4 w-4" />
                        </Pagination.NextButton>
                      </Pagination.Item>
                    </Pagination.Content>
                  </Pagination.Root> -->
            </main>
        </div>
    </div>
</div>