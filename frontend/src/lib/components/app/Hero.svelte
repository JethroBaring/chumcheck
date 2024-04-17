<script>
	import { flip } from 'svelte/animate';
	import Button from '../ui/button/button.svelte';
	import { draw, fade, fly, scale, slide } from 'svelte/transition';
</script>

<div class="relative h-full w-full">
	<div
		class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#ecf3fc_1px,transparent_1px),linear-gradient(to_bottom,#ecf3fc_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#171e31_1px,transparent_1px),linear-gradient(to_bottom,#171e31_1px,transparent_1px)]"
	></div>

	<div class="mx-auto flex h-screen w-4/5 items-center justify-between" id="hero">
		<div class="flex flex-1 flex-col gap-5 text-flutter-gray dark:text-flutter-white">
			<p class="text-7xl font-black">
				A New Way to <br /> Empower <br /> <span class="text-flutter-blue">Startups</span>
			</p>
			<p class="text-xl font-medium" transition:flip>
				Your startup's path to empowerment <br /> and success
			</p>
			<a data-sveltekit-reload href="/application">
				<Button class="shadow-lg shadow-flutter-blue/50 text-white">Apply Now!</Button>
			</a>
		</div>
		<div class="relative flex-1">
			<div
				class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-flutter-blue opacity-20 blur-[100px]"
			></div>
			<img src="startup.svg" alt="startup" class="w-full" />
		</div>
	</div>
</div>
