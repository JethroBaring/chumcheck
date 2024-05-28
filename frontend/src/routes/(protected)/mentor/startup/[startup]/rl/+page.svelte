<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Chart from 'chart.js/auto';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Rubrics from '$lib/components/mentor/Rubrics.svelte';
	import { goto } from '$app/navigation';
	export let data;

	let trl: number = data.readiness.filter((r) => r.readiness_type === 'Technology')[0].readiness_level,
		orl: number = data.readiness.filter((r) => r.readiness_type === 'Organizational')[0].readiness_level,
		mrl: number = data.readiness.filter((r) => r.readiness_type === 'Market')[0].readiness_level,
		rrl: number = data.readiness.filter((r) => r.readiness_type === 'Regulatory')[0].readiness_level,
		arl: number = data.readiness.filter((r) => r.readiness_type === 'Acceptance')[0].readiness_level,
		irl: number = data.readiness.filter((r) => r.readiness_type === 'Investment')[0].readiness_level;

	const redrawChart = () => {
		let ctx: HTMLCanvasElement;
		const d = {
			labels: ['Technology', 'Organizational', 'Market', 'Regulatory', 'Acceptance', 'Investment'],
			datasets: [
				{
					label: 'Readiness Levels',
					data: [trl, orl, mrl, rrl, arl, irl],
					fill: true,
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgb(54, 162, 235)',
					pointBackgroundColor: 'rgb(54, 162, 235)',
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: 'rgb(54, 162, 235)'
				}
			]
		};

		if (browser) {
			ctx = document.getElementById('chart') as HTMLCanvasElement;
			const chart = new Chart(ctx, {
				type: 'radar',
				data: d,
				options: {
					scales: {
						r: {
							min: 0,
							max: 9,
							ticks: {
								stepSize: 1
							}
						}
					},
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: false
						}
					}
				}
			});
		}
	};
	onMount(() => {
		redrawChart();
	});


</script>

<div class="flex items-center">
	<h1 class="text-lg font-semibold md:text-2xl">Readiness Level</h1>
</div>
<div class="flex flex-1 items-center justify-center">
	{#if data.scores.length != 0}
		<canvas id="chart" />
	{:else}
		<div class="h-full flex-1">
			<Tabs.Root value="technology" class="">
				<div class="flex items-center">
					<Tabs.List>
						<Tabs.Trigger value="technology">Technology</Tabs.Trigger>
						<Tabs.Trigger value="market">Market</Tabs.Trigger>
						<Tabs.Trigger value="organizational">Organizational</Tabs.Trigger>
						<Tabs.Trigger value="acceptance">Acceptance</Tabs.Trigger>
						<Tabs.Trigger value="regulatory">Regulatory</Tabs.Trigger>
						<Tabs.Trigger value="investment">Investment</Tabs.Trigger>
					</Tabs.List>
				</div>
				<form method="post">
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Technology')}
						type="technology"
					/>
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Market')}
						type="market"
					/>
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Acceptance')}
						type="acceptance"
					/>
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Organizational')}
						type="organizational"
					/>
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Regulatory')}
						type="regulatory"
					/>
					<Rubrics
						questions={data.questions.filter((q) => q.readiness_type === 'Investment')}
						type="investment"
					/>
					<button>Submit</button>
				</form>
			</Tabs.Root>
		</div>
	{/if}
</div>
