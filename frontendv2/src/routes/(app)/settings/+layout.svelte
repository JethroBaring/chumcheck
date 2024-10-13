<script lang="ts">
	import Sidebar from "./sidebar.svelte";

  let { children } = $props()

  const sidebarNavItems = [
		{
			title: "Profile",
			href: "/examples/forms",
		},
		{
			title: "Account",
			href: "/examples/forms/account",
		},
		{
			title: "Appearance",
			href: "/examples/forms/appearance",
		},
		{
			title: "Notifications",
			href: "/examples/forms/notifications",
		},
		{
			title: "Display",
			href: "/examples/forms/display",
		},
	];
</script>

<div class="space-y-6 p-10 pb-16 md:block h-full w-full">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">
			Manage your account settings and set e-mail preferences.
		</p>
	</div>
	<!-- <Separator class="my-6" /> -->
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<Sidebar items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			{@render children()}
		</div>
	</div>
</div>

<!-- <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
  <aside class="-mx-4 lg:w-1/5">
    <Sidebar items={sidebarNavItems} />
  </aside>
  <div class="flex-1 lg:max-w-2xl">
    {@render children()}
  </div>
</div> -->