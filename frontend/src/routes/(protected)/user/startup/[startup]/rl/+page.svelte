<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Chart from 'chart.js/auto';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	export let trl: number = 8, orl: number = 5, mrl: number = 6, rrl: number = 7, arl: number = 9, irl: number = 9;
	
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
		<canvas id="chart"/>
</div>