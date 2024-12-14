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
	import { Plus, Search } from 'lucide-svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	let { startupId } = data;
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
	let members: any = [];
	let search: string;
	let searchedUsers: any[] = [];

	async function searchUsers() {
		const response = await fetch(`${PUBLIC_API_URL}/users/?search=${search}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		console.log(response);
		const d = await response.json();
		console.log({ d });
		if (response.ok) {
			const membersSet = new Set(members.map((member: any) => member.id)); // Assuming each user has a unique id
			searchedUsers = d.results.filter((user: any) => !membersSet.has(user.id));
			search = ''
		}
	}

	async function addMember(userId: any) {
		const { data } = await axiosInstance.post('/startup-member', {
			user_id: userId,
			startup_id: startupId,
		});

		if (data) {
			toast.success('Successfully added a member');
		}
	}

	let firstName: string, lastName: string;

	async function addContractedMember(firstName: string, lastName: string) {
		const { data } = await axiosInstance.post('/startup-contracted-members/', {
			startup_id: startupId,
			first_name: firstName,
			last_name: lastName
		});

		if (data) {
			toast.success('Successfully added contracted member');
			firstName = '';
			lastName = '';
		}
	}

	function removeMember(member: any) {
		members = members.filter((d: any) => d != member);
		searchedUsers = [...searchedUsers, member];
	}

	let outsideMember = false;
</script>

<svelte:head>
	<title>Settings - Members</title>
</svelte:head>
<div class="flex flex-col gap-5">
	<h1 class="text-xl font-semibold">Invite Member</h1>
	<div class="flex items-center space-x-2">
		<Switch id="airplane-mode" bind:checked={outsideMember} />
		<Label for="airplane-mode">Contracted member</Label>
	</div>
	{#if outsideMember}
		<div class="flex w-2/3 items-end gap-3">
			<div class="grid flex-1 gap-2">
				<Label for="firstName">First Name</Label>
				<Input
					name="firstName"
					id="firstName"
					type="text"
					placeholder="John"
					required
					bind:value={firstName}
				/>
			</div>
			<div class="grid flex-1 gap-2">
				<Label for="lastName">Last Name</Label>
				<Input
					name="lastName"
					id="lastName"
					type="text"
					placeholder="Doe"
					required
					bind:value={lastName}
				/>
			</div>
			<Button class="w-24" onclick={() => addContractedMember(firstName, lastName)}
				><Plus class="h-4 w-4" /> Add</Button
			>
		</div>
	{:else}
		<div class="flex w-2/3 items-end gap-3">
			<div class="grid flex-1 gap-2">
				<Label for="email">Email</Label>
				<Input
					name="email"
					id="email"
					type="email"
					placeholder="m@example.com"
					required
					bind:value={search}
				/>
			</div>
			<Button class="w-24" onclick={searchUsers}><Search class="h-4 w-4" /> Search</Button>
		</div>
		<div class="text-sm">Results</div>
		{#if searchedUsers.length !== 0}
			{#each searchedUsers as user}
				<div>{user.first_name} {user.last_name}

					<Button onclick={() => addMember(user.id)}></Button>
				</div>
			{/each}
		{/if}
	{/if}
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
</div>
