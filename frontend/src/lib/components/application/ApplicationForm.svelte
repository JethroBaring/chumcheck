<script lang="ts" context="module">
	export async function getData() {
		const uratQuestions = await fetch(`${PUBLIC_API_URL}/readinesslevel/urat-questions/`);

		const data = await uratQuestions.json();
		if (uratQuestions.ok) {
			const calculatorQuestions = await fetch(
				`${PUBLIC_API_URL}/readinesslevel/calculator-categories/`
			);

			const data2 = await calculatorQuestions.json();

			if (calculatorQuestions.ok) {
				return {
					technologyQuestions: data.results.filter((d: any) => d.readiness_type === 'Technology'),
					marketQuestions: data.results.filter((d: any) => d.readiness_type === 'Market'),
					acceptanceQuestions: data.results.filter((d: any) => d.readiness_type === 'Acceptance'),
					organizationalQuestions: data.results.filter(
						(d: any) => d.readiness_type === 'Organizational'
					),
					regulatoryQuestions: data.results.filter((d: any) => d.readiness_type === 'Regulatory'),
					investmentQuestions: data.results.filter((d: any) => d.readiness_type === 'Investment'),
					calculator: data2.results
				};
			}
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import Button from '../ui/button/button.svelte';
	import DataPrivacy from './DataPrivacy.svelte';
	import EligibilityAgreement from './EligibilityAgreement.svelte';
	import ProjectDetails from './ProjectDetails.svelte';
	import GroupInformation from './GroupInformation.svelte';
	import Technology from './Technology.svelte';
	import Acceptance from './Acceptance.svelte';
	import Market from './Market.svelte';
	import Regulatory from './Regulatory.svelte';
	import Investment from './Investment.svelte';
	import Organizational from './Organizational.svelte';
	import TechnologyCalculator from './Calculator.svelte';
	import { enhance } from '$app/forms';
	import { PUBLIC_API_URL } from '$env/static/public';

	let data: any;

	const steps = [
		'data-privacy',
		'eligibility-agreement',
		'project-details',
		'group-information',
		'technology',
		'market',
		'regulatory',
		'acceptance',
		'organizational',
		'investment',
		'calculator'
	];
	const labels = [
		'Data Privacy and Consent',
		'Eligibility and Agreement',
		'Project Details',
		'Group Information',
		'Technology Readiness Level',
		'Market Readiness Level',
		'Regulatory Readiness Level',
		'Acceptance Readiness Level',
		'Organizational Readiness Level',
		'Investment Readiness Level',
		'Technology and Commercialization Readiness Level Calculator'
	];

	let currentActive = 0;
	let formData = {
		dataPrivacy: false,
		eligibility: false
	};

	const toggleDataPrivacy = () => {
		formData.dataPrivacy = !formData.dataPrivacy;
	};

	const toggleEligibility = () => {
		formData.eligibility = !formData.eligibility;
	};
	function handleStep(stepIncrement: number) {
		currentActive += stepIncrement;
	}

	onMount(() => {
		async function test() {
			const d = await getData();
			console.log(d);
			data = d;
		}
		test();
	});

</script>

<form method="post" class="flex flex-col gap-5 p-5" enctype="multipart/form-data">
	<h1 class="text-2xl font-semibold">{labels[currentActive]}</h1>
	<DataPrivacy dataPrivacy={formData.dataPrivacy} {toggleDataPrivacy} {currentActive} />
	<EligibilityAgreement {currentActive} {toggleEligibility} eligibility={formData.eligibility} />
	<ProjectDetails {currentActive} />
	<GroupInformation {currentActive} />
	{#if data}
		<Technology {currentActive} question={data.technologyQuestions} />
		<Market {currentActive} question={data.marketQuestions} />
		<Regulatory {currentActive} question={data.regulatoryQuestions} />
		<Acceptance {currentActive} question={data.acceptanceQuestions} />
		<Organizational {currentActive} question={data.organizationalQuestions} />
		<Investment {currentActive} question={data.investmentQuestions} />
		<TechnologyCalculator {currentActive} calculatorQuestions={data.calculator} />
	{/if}
	<div class="flex justify-end gap-3">
		{#if currentActive != 0}
			<Button variant="outline" class="w-24" on:click={() => handleStep(-1)}>Previous</Button>
		{/if}

		{#if currentActive < steps.length - 1}
			<Button
				variant="secondary"
				class="w-24"
				on:click={() => handleStep(1)}
				disabled={currentActive == 0 && !formData.dataPrivacy
					? true
					: currentActive == 1 && !formData.eligibility
						? true
						: false}>Next</Button
			>
		{:else}
			<Button class="w-24" type="submit">Submit</Button>
		{/if}
	</div>
</form>
