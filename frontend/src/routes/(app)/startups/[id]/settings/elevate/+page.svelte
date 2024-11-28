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

	let readiness
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
		const readinessToUpdate = readiness.filter(r => r.new !== 0);

		if (readinessToUpdate.length > 0) {
			const requests = readinessToUpdate.map(r =>
				axiosInstance.post(`/startup-readiness-levels/`, {
					startup_id: data.startupId,
					readiness_level_id: r.new,
				}, {
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				})
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

	$: console.log(readiness);
</script>

<div class="flex flex-col gap-5">
	<h1 class="text-xl font-semibold">Elevate</h1>
	<div class="flex w-[200px] flex-col gap-3">
		{#each readiness as r}
			<div class="flex items-center justify-between">
				<h2>{r.name}</h2>
				{#if $readinessData.isLoading}
					<Skeleton class="h-10" />
				{:else}
					<Select.Root
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
					</Select.Root>
				{/if}
			</div>
		{/each}
	</div>

	<div><Button on:click={elevate}>Elevate</Button></div>
</div>