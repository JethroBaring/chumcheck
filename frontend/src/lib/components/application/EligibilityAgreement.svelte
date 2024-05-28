<script lang="ts">
	export let toggleEligibility: Function
	export let eligibility: boolean
	export let currentActive: number;
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
</script>

<div class="flex-1 overflow-scroll" class:hidden={currentActive !== 1}>
	<div class="h-0 flex flex-col gap-5">
		<p class="text-base">
			I confirm that I have read, understood, and agree to comply with the eligibility criteria and
			rules of the competition. Additionally, I will review the eligibility requirements and
			agreement.
		</p>

		<RadioGroup.Root value={eligibility ? 'true' : 'false'}>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="true" id="eligibilityAgree" on:click={() => toggleEligibility()}/>
				<Label for="eligibilityAgree">Agree</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="false" id="eligibilityDisagree" on:click={() => toggleEligibility()}/>
				<Label for="eligibilityDisagree">Disagree</Label>
			</div>
			<RadioGroup.Input name="eligibility" />
		</RadioGroup.Root>
	</div>
</div>
