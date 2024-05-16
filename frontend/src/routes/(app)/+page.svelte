<script lang="ts">
	import { Header, Hero, HowItWork, AboutUs, Footer } from '$lib/components/app';
</script>

<svelte:head>
	<title>ChumCheck</title>
</svelte:head>

<div class="bg-grid">
	<div class="mx-auto w-4/5">
		<Header />
		<Hero />
		<HowItWork />
		<AboutUs />
		<Footer />
	</div>
</div>
