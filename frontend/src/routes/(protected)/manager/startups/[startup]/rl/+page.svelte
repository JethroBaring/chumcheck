<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Chart from 'chart.js/auto';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Rubrics from '$lib/components/mentor/Rubrics.svelte';
	import ReadOnlyRubics from '$lib/components/mentor/ReadOnlyRubrics.svelte'
	import ReadOnlyRubrics from '$lib/components/mentor/ReadOnlyRubrics.svelte';
	export let data;

	let trl: number = 0,
		orl: number = 0,
		mrl: number = 0,
		rrl: number = 0,
		arl: number = 0,
		irl: number = 0;

	if (data.readiness.length > 0) {
		(trl = data.readiness.filter((r) => r.readiness_type === 'Technology')[0].readiness_level),
			(orl = data.readiness.filter((r) => r.readiness_type === 'Organizational')[0]
				.readiness_level),
			(mrl = data.readiness.filter((r) => r.readiness_type === 'Market')[0].readiness_level),
			(rrl = data.readiness.filter((r) => r.readiness_type === 'Regulatory')[0].readiness_level),
			(arl = data.readiness.filter((r) => r.readiness_type === 'Acceptance')[0].readiness_level),
			(irl = data.readiness.filter((r) => r.readiness_type === 'Investment')[0].readiness_level);
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
		if (data.readiness.length > 0) {
			redrawChart();
		}
	});
</script>
<svelte:head>
	<title>Readiness Level</title>
</svelte:head>
<div class="flex items-center">
	<h1 class="text-lg font-semibold md:text-2xl">Readiness Level</h1>
</div>
<div class="flex flex-1 items-center justify-center">
	{#if data.scores.length != 0}
		<div class="h-full flex-1">
			<Tabs.Root value="chart" class="h-full">
				<div class="flex items-center">
					<Tabs.List>
						<Tabs.Trigger value="chart">Chart</Tabs.Trigger>
						<Tabs.Trigger value="detailed">Detailed</Tabs.Trigger>
					</Tabs.List>
				</div>
				<Tabs.Content value="chart" class="h-[700px]">
					<canvas id="chart" />
				</Tabs.Content>
				<Tabs.Content value="detailed">
						<Tabs.Root value="technology" class="h-full">
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
							<div class="overflow-scroll h-full">
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Technology')}
										scores={data.scores.filter((score) => score.readiness_type === 'Technology')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Technology")[0]}
										type="technology"
									/>
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Market')}
										scores={data.scores.filter((score) => score.readiness_type === 'Market')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Market")[0]}
										type="market"
									/>
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Acceptance')}
										scores={data.scores.filter((score) => score.readiness_type === 'Acceptance')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Acceptance")[0]}
										type="acceptance"
									/>
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Organizational')}
										scores={data.scores.filter((score) => score.readiness_type === 'Organizational')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Organizational")[0]}
										type="organizational"
									/>
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Regulatory')}
										scores={data.scores.filter((score) => score.readiness_type === 'Regulatory')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Regulatory")[0]}
										type="regulatory"
									/>
									<ReadOnlyRubrics
										questions={data.questions.filter((q) => q.readiness_type === 'Investment')}
										scores={data.scores.filter((score) => score.readiness_type === 'Investment')}
										readiness_level={data.readiness.filter((r) => r.readiness_type==="Investment")[0]}
										type="investment"
									/>
							</div>
						</Tabs.Root>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	{:else}
	<div class="h-full flex-1">
		<Tabs.Root value="technology" class="h-full">
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
			<div class="overflow-scroll h-full">
				<form method="post" class="h-0">
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
					<Button type="submit" class="mt-3">Submit</Button>
				</form>
			</div>
		</Tabs.Root>
	</div>
	{/if}
</div>
