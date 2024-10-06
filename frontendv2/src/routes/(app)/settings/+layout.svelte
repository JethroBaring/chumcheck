<script lang="ts">
  import { page } from "$app/stores";
  let { children } = $props()

  let currentPage = $derived($page.url.pathname.slice(1).split('/')[1])

</script>

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold">Settings</h2>
		<p class="text-muted-foreground">Manage your account</p>
	</div>
</div>

<div class="mt-5 grid w-full grid-cols-[250px_1fr] gap-5">
	<nav class="flex flex-1 flex-col gap-1 text-sm text-muted-foreground">
		<a href="##" class="rounded-lg bg-secondary p-2 px-4 font-semibold text-primary" class:font-semibold={currentPage === 'profile'}> Profile </a>
		<a href="##" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'appearance'}>Appearance</a>
		<a href="##" class="rounded-lg p-2 px-4 hover:bg-secondary/80">Change Password</a>
	</nav>
	{@render children()}
</div>
