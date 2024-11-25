<script lang="ts">
	import { RatedRubric, Stepper } from '$lib/components/startups/readiness';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { useQueries } from '@sveltestack/svelte-query';
	import { getData, isMentor } from '$lib/utils';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { Check } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Rubric from '$lib/components/startups/readiness/rubric.svelte';

	const { data } = $props();
	const { access, startupId, role } = data;

	const readinessLevelQueries = useQueries([
		{
			queryKey: ['startup', startupId],
			queryFn: () => getData(`/startups/${startupId}/`, access!)
		},
		{
			queryKey: ['readinessLevelsPage1'],
			queryFn: () => getData(`/readinesslevel/readiness-levels/?page_size=54`, access!)
		},
		{
			queryKey: ['haveScores', startupId],
			queryFn: () =>
				getData(
					`/readiness-level-criterion-answers/?page_size=324&startup_id=${startupId}`,
					access!
				)
		},
		{
			queryKey: ['readinessLevel', startupId],
			queryFn: () => getData(`/startup-readiness-levels/?startup_id=${startupId}`, access!)
		}
	]);
	const { isLoading, isError } = $derived(useQueriesState($readinessLevelQueries));
	const isRated: boolean = $state(true);
	let selectedTab = $state('chart');
	let selectedReadinessTab = $state('technology');
	const rubrics = $derived(
		$readinessLevelQueries[1].isSuccess
			? {
					technology: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Technology'
					),
					market: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Market'
					),
					acceptance: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Acceptance'
					),
					organizational: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Organizational'
					),
					regulatory: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Regulatory'
					),
					investment: $readinessLevelQueries[1].data.results.filter(
						(r: any) => r.readiness_type === 'Investment'
					)
				}
			: {
					technology: [],
					market: [],
					acceptance: [],
					organizational: [],
					regulatory: [],
					investment: []
				}
	);
	const readiness = $derived(
		$readinessLevelQueries[3].isSuccess
			? {
					technology: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Technology'
					)[0].readiness_level,
					organizational: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Organizational'
					)[0].readiness_level,
					acceptance: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Acceptance'
					)[0].readiness_level,
					market: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Market'
					)[0].readiness_level,
					regulatory: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Regulatory'
					)[0].readiness_level,
					investment: $readinessLevelQueries[3].data.results.filter(
						(r: any) => r.readiness_type === 'Investment'
					)[0].readiness_level
				}
			: {
					technology: 0,
					organizational: 0,
					acceptance: 0,
					market: 0,
					regulatory: 0,
					investment: 0
				}
	);

	let current = $state(0);

	const next = () => {
		if (current < 7) {
			current++;
		}
	};

	const previous = () => {
		if (current > 0) {
			current--;
		}
	};

	const updateTab = (tab: string) => {
		selectedTab = tab;
	};

	const updateReadinessTab = (tab: string) => {
		selectedReadinessTab = tab;
	};
</script>

<div class="flex h-full flex-col">
	{#if isLoading}
		{@render loading()}
	{:else if isError}
		{@render error()}
	{:else if isRated}
		{@render rated()}
	{:else if isMentor(role)}
		{@render mentor()}
	{:else}
		<div>
			<p>Looks like you haven't been rated yet</p>
		</div>
	{/if}
</div>

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet rated()}
	<div class="flex h-full flex-col gap-3">
		<div class="flex justify-between">
			<div class="flex h-fit justify-between rounded-lg bg-background">
				<Tabs.Root value={selectedTab}>
					<Tabs.List class="border bg-flutter-gray/20">
						<Tabs.Trigger value="chart" class="capitalize" onclick={() => updateTab('chart')}>Chart</Tabs.Trigger>
						<Tabs.Trigger value="detailed" class="capitalize" onclick={() => updateTab('detailed')}>Detailed</Tabs.Trigger>
					</Tabs.List>
				</Tabs.Root>
			</div>
			{#if selectedTab === 'detailed'}
				<div class="flex h-fit justify-between rounded-lg bg-background">
					<Tabs.Root value={selectedReadinessTab}>
						<Tabs.List class="border bg-flutter-gray/20">
							<Tabs.Trigger
								value="technology"
								class="capitalize"
								onclick={() => updateReadinessTab('technology')}>Technology</Tabs.Trigger
							>
							<Tabs.Trigger
								value="acceptance"
								class="capitalize"
								onclick={() => updateReadinessTab('acceptance')}>Acceptance</Tabs.Trigger
							>
							<Tabs.Trigger
								value="market"
								class="capitalize"
								onclick={() => updateReadinessTab('market')}>Market</Tabs.Trigger
							>
							<Tabs.Trigger
								value="organizational"
								class="capitalize"
								onclick={() => updateReadinessTab('organizational')}>Organizational</Tabs.Trigger
							>
							<Tabs.Trigger
								value="regulatory"
								class="capitalize"
								onclick={() => updateReadinessTab('regulatory')}>Regulatory</Tabs.Trigger
							>
							<Tabs.Trigger
								value="investment"
								class="capitalize"
								onclick={() => updateReadinessTab('investment')}>Investment</Tabs.Trigger
							>
						</Tabs.List>
					</Tabs.Root>
				</div>
			{/if}
		</div>
		{#if selectedTab === 'chart'}
			<!-- content here -->
		{:else}
			<div class="flex h-full flex-col gap-3">
				<div class="flex h-full flex-col overflow-scroll">
					<div class="flex h-0 flex-col">
						<RatedRubric
							questionnaires={rubrics.technology}
							type={'technology'}
							current={selectedReadinessTab}
						/>
						<RatedRubric
							questionnaires={rubrics.acceptance}
							type={'acceptance'}
							current={selectedReadinessTab}
						/>
						<RatedRubric
							questionnaires={rubrics.market}
							type={'market'}
							current={selectedReadinessTab}
						/>
						<RatedRubric
							questionnaires={rubrics.regulatory}
							type={'regulatory'}
							current={selectedReadinessTab}
						/>
						<RatedRubric
							questionnaires={rubrics.organizational}
							type={'organizational'}
							current={selectedReadinessTab}
						/>
						<RatedRubric
							questionnaires={rubrics.investment}
							type={'investment'}
							current={selectedReadinessTab}
						/>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

{#snippet mentor()}
	<div class="flex h-full flex-col gap-3">
		<Stepper {current} />
		<div class="flex h-full flex-col overflow-scroll">
			<form class="flex h-0 flex-col">
				<Rubric questionnaires={rubrics.technology} step={1} {current} />
				<Rubric questionnaires={rubrics.acceptance} step={2} {current} />
				<Rubric questionnaires={rubrics.market} step={3} {current} />
				<Rubric questionnaires={rubrics.regulatory} step={4} {current} />
				<Rubric questionnaires={rubrics.organizational} step={5} {current} />
				<Rubric questionnaires={rubrics.investment} step={6} {current} />
			</form>
		</div>
		<div class="ml-auto flex gap-2">
			<Button variant="secondary" onclick={previous} disabled={current === 0}>Previous</Button>
			<Button onclick={next} disabled={current === 6}>Next</Button>
		</div>
	</div>
{/snippet}
