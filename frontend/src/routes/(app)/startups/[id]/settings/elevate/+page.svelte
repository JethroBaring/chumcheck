<script lang="ts">
	import axiosInstance from '$lib/axios';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { PageData } from './$types';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Select from '$lib/components/ui/select';
	import { Filter } from 'lucide-svelte';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
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
			staleTime: 0,
			refetchOnWindowFocus: false
		}
	);

	const readinessData = useQuery(
		'readinessData',
		async () =>
			(
				await axiosInstance.get(`/startup-readiness-levels/?startup_id=${data.startupId}`, {
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				})
			).data,
		{
			cacheTime: 0,
			staleTime: 0,
			refetchOnWindowFocus: false
		}
	);

	const readinessLevel = useQuery(
		'readinessLevels',
		async () =>
			(
				await axiosInstance.get(`/readinesslevel/readiness-levels/`, {
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				})
			).data,
		{
			cacheTime: 0,
			staleTime: 0,
			refetchOnWindowFocus: false
		}
	);

	$: if ($readinessData.isSuccess) {
		console.log($readinessData.data.results);
	}

	let readiness;
	readiness = [
		{
			name: 'Technology',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Technology')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		},
		{
			name: 'Market',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Market')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		},
		{
			name: 'Regulatory',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Regulatory')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		},
		{
			name: 'Acceptance',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Acceptance')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		},
		{
			name: 'Organizational',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Organizational')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		},
		{
			name: 'Investment',
			prev: $readinessData.isSuccess
				? $readinessData.data.results
						.filter((d) => d.readiness_type === 'Investment')
						.sort((a, b) => b.id - a.id)[0]?.readiness_level
				: 0,
			new: 0
		}
	];

	async function elevate() {
		const readinessToUpdate = readiness.filter((r) => r.new !== 0);

		if (readinessToUpdate.length > 0) {
			const requests = readinessToUpdate.map((r) =>
				axiosInstance.post(
					`/startup-readiness-levels/`,
					{
						startup_id: data.startupId,
						readiness_level_id: r.new
					},
					{
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					}
				)
			);

			try {
				await axios.all(requests);
				console.log('All readiness levels updated successfully');
				toast.success('Elevated successfully');
			} catch (error) {
				console.error('Error updating readiness levels:', error);
			}
		} else {
			console.log('No readiness levels to update');
		}
	}

</script>

<div class="flex flex-col gap-5">
	<h1 class="text-xl font-semibold">Elevate</h1>
		<div class="flex items-center justify-between">
			{#if $readinessData.isLoading}
				<Skeleton class="h-10" />
			{:else}
				<div class="w-2/3 rounded-md border">
					<Table.Root class="rounded-lg bg-background">
						<Table.Header>
							<Table.Row class="text-centery h-12">
								<Table.Head class="pl-5">Type</Table.Head>
								<Table.Head class="">Current Level</Table.Head>
								<Table.Head class="">Elevated Level</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#if $queryResult.isLoading}
								<Skeleton class="h-40" />
							{:else}
								{#each readiness as r}
										<Table.Row class="h-14 cursor-pointer">
											<Table.Cell class="pl-5">{r.name}</Table.Cell>
											<Table.Cell class="">1</Table.Cell>
											<Table.Cell class="">2</Table.Cell>
										</Table.Row>
								{/each}
							{/if}
						</Table.Body>
					</Table.Root>
				</div>

				<!-- <Select.Root
						onSelectedChange={(e) => {
							r.new = e?.value;
						}}
					>
						<Select.Trigger class="w-[300px]">
							<Select.Value
								placeholder={$readinessData.data.results
									.filter((d) => d.readiness_type === r.name)
									.sort((a, b) => b.id - a.id)[0]?.readiness_level}
							/>
						</Select.Trigger>

						<Select.Content>
							{#each $readinessLevel.data.results.filter((data) => data.readiness_type === r.name) as item}
								<Select.Item value={item.id}>{item.level}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root> -->
			{/if}
	</div>
	<div><Button onclick={elevate}>Elevate</Button></div>
</div>
