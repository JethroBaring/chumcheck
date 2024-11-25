<script lang="ts">
	import { RadioButton } from '$lib/components/ui/radio';
import { CriteriaTable } from '.';

	const { questionnaires, step, current } = $props();
</script>

<div class="flex flex-col gap-3" class:hidden={step - 1 !== current}>
	{#each questionnaires as questionnaire}
		{@const criterias = questionnaire.level_criteria}
		<div class="flex flex-col gap-1">
			<div class="flex gap-3"><div><RadioButton name={'wew'}/></div><p>{questionnaire.level} {questionnaire.name}</p></div>
			<CriteriaTable {criterias} />
		</div>
	{/each}
</div>
