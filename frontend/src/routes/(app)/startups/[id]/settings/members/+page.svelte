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
	import { Search } from 'lucide-svelte';

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
	let members: any = []
	let search: string;
	let searchedUsers: any[] = [];

	async function searchUsers() {
		const response = await fetch(`${PUBLIC_API_URL}/users/?search=${search}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
    console.log(response)
		const d = await response.json();

		if (response.ok) {
			const membersSet = new Set(members.map((member: any) => member.id)); // Assuming each user has a unique id
			searchedUsers = d.results.filter((user: any) => !membersSet.has(user.id));		}
	}

	function addMember(member: any) {
		members = [...members, member]
		searchedUsers = searchedUsers.filter(d => d.email != member.email)
	}

	function removeMember(member: any) {
		members = members.filter((d: any) => d != member)
		searchedUsers = [...searchedUsers, member]
	}
</script>

<svelte:head>
	<title>Settings - Members</title>
</svelte:head>
<div class="flex flex-col gap-5">
	<h1 class="text-xl font-semibold">Invite Member</h1>
	<div class="flex items-end gap-3 w-2/3">
		<div class="flex-1 grid gap-2">
			<Label for="email">Email</Label>
			<Input name="email" id="email" type="email" placeholder="m@example.com" required />
		</div>
		<Button class="w-24"><Search class="h-4 w-4"/> Search</Button>
	</div>
	<div>
		Results
	</div>
	<h1 class="text-xl font-semibold">Members</h1>
	<div class="w-2/3 rounded-md border">
		<Table.Root class="bg-background rounded-lg">
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
</div>
