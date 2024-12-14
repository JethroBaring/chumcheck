<script lang="ts">
	import { RadioButton } from '$lib/components/ui/radio';
	import { CriteriaTable } from '.';

	const { questionnaires, step, current, type } = $props();
</script>

<div class="flex flex-col gap-3" class:hidden={step - 1 !== current}>
	{#each questionnaires as questionnaire, index}
		{@const criterias = questionnaire.level_criteria}
		<div class="flex flex-col gap-1">
			<div class="flex gap-3">
				<div>
					<RadioButton
						name={`${type}ReadinessLevel`}
						value={questionnaire.id}
						checked={index === 0}
					/>
				</div>
				<p>{questionnaire.level} {questionnaire.name}</p>
			</div>
			<CriteriaTable {criterias} {type} {questionnaire} />
		</div>
	{/each}
</div>
