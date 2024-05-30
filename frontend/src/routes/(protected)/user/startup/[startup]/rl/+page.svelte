<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Chart from 'chart.js/auto';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	export let data;
	let trl: number = 8,
		orl: number = 5,
		mrl: number = 6,
		rrl: number = 7,
		arl: number = 9,
		irl: number = 9;
	console.log(data.readiness);
	if(data.readiness.length > 0) {
		trl = data.readiness.filter(d => d.readiness_type === "Technology")[0].readiness_level
		orl = data.readiness.filter(d => d.readiness_type === "Organizational")[0].readiness_level
		mrl = data.readiness.filter(d => d.readiness_type === "Market")[0].readiness_level
		rrl = data.readiness.filter(d => d.readiness_type === "Regulatory")[0].readiness_level
		arl = data.readiness.filter(d => d.readiness_type === "Acceptance")[0].readiness_level
		irl = data.readiness.filter(d => d.readiness_type === "Investment")[0].readiness_level
	}
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
<div class="flex flex-1 items-center justify-center p-20">
	{#if data.readiness.length > 0}
		<canvas id="chart" />
	{:else}
		<div>Readiness Level Radar Chart will show once your mentor rated you startup</div>
	{/if}
</div>
