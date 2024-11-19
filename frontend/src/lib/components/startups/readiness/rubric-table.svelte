<script lang="ts">
	import { RadioButton } from '$lib/components/ui/radio';
import * as Table from '$lib/components/ui/table/index.js';

</script>

<div class="flex flex-col gap-2">
	<h1>Hello World</h1>
<div class="rounded-md border">
	<Table.Root class="rounded-lg bg-background">
		<Table.Header>
				<Table.Row>
						<Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
            <Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
            <Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
            <Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
            <Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
            <Table.Head class="h-12 pl-5">
							Criteria
						</Table.Head>
				</Table.Row>
		</Table.Header>
		<Table.Body>
				<Table.Row>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              test
						</Table.Cell>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              <RadioButton name={'test'}/>
						</Table.Cell>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              <RadioButton name={'test'}/>
						</Table.Cell>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              <RadioButton name={'test'}/>
						</Table.Cell>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              <RadioButton name={'test'}/>
						</Table.Cell>
						<Table.Cell class="h-14 cursor-pointer pl-5">
              <RadioButton name={'test'}/>
						</Table.Cell>
				</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
</div>
