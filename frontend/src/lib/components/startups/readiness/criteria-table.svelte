<script lang="ts">
	import { RadioButton } from '$lib/components/ui/radio';
	import * as Table from '$lib/components/ui/table/index.js';
	const { criterias } = $props();
</script>


<div class="rounded-md border">
	<Table.Root class="rounded-lg bg-background">
		<Table.Header>
			<Table.Row class="h-12 text-centery">
				<Table.Head class="w-1/4 pl-5">Criteria</Table.Head>
				<Table.Head class="text-center">Excellent (5)</Table.Head>
				<Table.Head class="text-center">Good (4)</Table.Head>
				<Table.Head class="text-center">Fair (3)</Table.Head>
				<Table.Head class="text-center">Poor (2)</Table.Head>
				<Table.Head class="text-center">Very Poor (1)</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each criterias as criteria}
				<Table.Row class="h-14 cursor-pointer">
					<Table.Cell class="w-1/4 pl-5">{criteria.criteria}</Table.Cell>
					<Table.Cell class="w-[200px]">
						<RadioButton name={'test'} />
					</Table.Cell>
					<Table.Cell class="w-[200px]">
						<RadioButton name={'test'} />
					</Table.Cell>
					<Table.Cell class="w-[200px]">
						<RadioButton name={'test'} />
					</Table.Cell>
					<Table.Cell class="w-[200px]">
						<RadioButton name={'test'} />
					</Table.Cell>
					<Table.Cell class="w-[200px]">
						<RadioButton name={'test'} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
