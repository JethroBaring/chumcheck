<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Header, Hero, HowItWork, AboutUs, Footer } from '$lib/components/app';
</script>

<svelte:head>
	<title>ChumCheck</title>
</svelte:head>

<div class="bg-grid">
	<div class="mx-auto w-full">
		{PUBLIC_API_URL}
		<Header />
		<Hero />
		<HowItWork />
		<AboutUs />
		<Footer />
	</div>
</div>
