<script lang="ts">
	import axiosInstance from '$lib/axios';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { PageData } from './$types';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Table from '$lib/components/ui/table';

	export let data: PageData;

	const queryResult = useQuery(
		'startupData',
		async () =>
			(
				await axiosInstance.get(`/startups/${data.startupId}`, {
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				})
			).data,
		{
			cacheTime: 0,
			staleTime: 0
		}
	);

	$: if ($queryResult.isSuccess) {
		console.log($queryResult.data);
	}
</script>
<svelte:head>
	<title
		>Settings - Members</title
	>
</svelte:head>
<div class="flex flex-col gap-5">
	<h1 class="text-xl font-semibold">Members</h1>
	<div class="w-2/3 rounded-md border">
		<Table.Root class="rounded-lg bg-background">
			<Table.Header>
				<Table.Row class="text-centery h-12">
					<Table.Head class="pl-5">Name</Table.Head>
					<Table.Head class="">Role</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if $queryResult.isLoading}
					<Skeleton class="h-40" />
				{:else}
					<Table.Row class="h-14 cursor-pointer">
						<Table.Cell class="pl-5"
							>{$queryResult.data.leader_first_name}
							{$queryResult.data.leader_last_name}</Table.Cell
						>
						<Table.Cell class="">Leader</Table.Cell>
					</Table.Row>
					{#each $queryResult.data.members as member}
						<Table.Row class="h-14 cursor-pointer">
							<Table.Cell class="pl-5">{member.first_name} {member.last_name}</Table.Cell>
							<Table.Cell class="">Member</Table.Cell>
						</Table.Row>
					{/each}
				{/if}

				<!-- {#each criterias as criteria, i}
					<Table.Row class="h-14 cursor-pointer">
						<input
							type="hidden"
							name={`${type}Criteria${questionnaire.level}${i + 1}`}
							value={`${criteria.id}`}
						/>
						<Table.Cell class="w-1/4 pl-5">{criteria.criteria}</Table.Cell>
						<Table.Cell class="w-[200px]">
							<RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="5"/>
						</Table.Cell>
						<Table.Cell class="w-[200px]">
							<RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="4"/>
						</Table.Cell>
						<Table.Cell class="w-[200px]">
							<RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="3"/>
						</Table.Cell>
						<Table.Cell class="w-[200px]">
							<RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="2"/>
						</Table.Cell>
						<Table.Cell class="w-[200px]">
							<RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="1" checked/>
						</Table.Cell>
					</Table.Row>
				{/each} -->
			</Table.Body>
		</Table.Root>
	</div>
	<!-- <Card.Root class="w-2/3">
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Role</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if $queryResult.isLoading}
						<Skeleton class="h-40" />
					{:else}
						<Table.Row>
							<Table.Cell
								>{$queryResult.data.leader_first_name}
								{$queryResult.data.leader_last_name}</Table.Cell
							>
							<Table.Cell>Leader</Table.Cell>
						</Table.Row>
            {#each $queryResult.data.members as member}
            <Table.Row>
							<Table.Cell
								>{member.first_name}
								{member.last_name}</Table.Cell
							>
							<Table.Cell>Member</Table.Cell>
						</Table.Row>
            {/each}
					{/if}

				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root> -->

	<!-- <div class="grid w-2/3 grid-cols-1 gap-5">
		<div class="grid gap-2">
			<Label for="firstName">Startup Name</Label>
			{#if $queryResult.isLoading}
				<Skeleton class="h-10" />
			{:else}
				<Input name="firstName" id="firstName" type="firstName" required readonly value={$queryResult.data.name}/>
			{/if}
		</div>
		<div class="grid gap-2">
			<Label for="lastName">Group Name</Label>
			{#if $queryResult.isLoading}
				<Skeleton class="h-10" />
			{:else}
				<Input name="lastName" id="lastName" type="lastName" required readonly value={$queryResult.data.group_name}/>
			{/if}
		</div>
	</div> -->
</div>
