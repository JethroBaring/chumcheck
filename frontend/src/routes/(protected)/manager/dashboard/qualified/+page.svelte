<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Eye from 'lucide-svelte/icons/eye';
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import { Textarea } from '$lib/components/ui/textarea';
	import RadarChart from '$lib/components/shared/RadarChart.svelte';
	import { fade } from 'svelte/transition';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { PUBLIC_API_URL } from '$env/static/public';

	export let data;
	const access = data.access
	let applicants = data.applicants;

	let showCapsule = false;

	function toggleCapsule() {
		showCapsule = !showCapsule;
	}

	let showAcceptedDialog = false;

	function toggleAcceptedDialog() {
		showAcceptedDialog = !showAcceptedDialog;
	}
	let inf: any, lev: any;

	async function getStartupInformation(startupId: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();
		if (response.ok) {
			const level = await fetch(
				`${PUBLIC_API_URL}/startup-readiness-levels/?startup_id=${data.id}`,
				{
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access}`
					}
				}
			);
			const levels = await level.json();
			if (level.ok) {
				inf = data;
				lev = levels.results;
				// return {
				// 	info: data,
				// 	questions: questions_data.results,
				// 	answers: answers_data.results,
				// 	access: access,
				// 	calculator: calculator_data
				// };
				toggleAcceptedDialog();
			}
		}
	}
</script>

<Tabs.Content value="qualified">
	<Card.Root
		data-x-chunk-name="dashboard-06-chunk-1"
		data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
	>
		<Card.Content class="pt-[24px]">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Startup Name</Table.Head>
						<Table.Head>Group Name</Table.Head>
						<Table.Head>Leader Name</Table.Head>
						<Table.Head>
							<span class="sr-only">Actions</span>
						</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each applicants as applicant}
						<Table.Row class="h-[80px]">
							<Table.Cell class="font-medium">{applicant.name}</Table.Cell>
							<Table.Cell>{applicant.group_name}</Table.Cell>
							<Table.Cell class="hidden md:table-cell"
								>{applicant.leader_first_name} {applicant.leader_last_name}</Table.Cell
							>
							<Table.Cell>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger asChild let:builder>
										<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
											<Ellipsis class="h-4 w-4" />
											<span class="sr-only">Toggle menu</span>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Label>Action</DropdownMenu.Label>
										<DropdownMenu.Item>Approve</DropdownMenu.Item>
										<DropdownMenu.Item>Reject</DropdownMenu.Item>
										<DropdownMenu.Item on:click={() => getStartupInformation(applicant.id)}
											>View</DropdownMenu.Item
										>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</Tabs.Content>

<Dialog.Root open={showAcceptedDialog} onOpenChange={toggleAcceptedDialog}>
	<Dialog.Content class="h-[90%] max-w-[800px]">
		<div class="flex flex-col overflow-scroll">
			<div class="flex h-0 flex-col gap-5">
				<!-- Project Details -->
				<div class="flex flex-col gap-3">
					<h1 class="text-lg font-semibold">Project Details</h1>
					<div class="grid gap-2">
						<Label for="email">Startup Name</Label>
						<Input
							readonly
							name="email"
							id="email"
							type="email"
							placeholder="m@example.com"
							value={inf.name}
						/>
					</div>

					<div class="grid gap-2">
						<Label for="email" class="flex gap-2"
							>Capsule Proposal

							{#if showCapsule}
								<button on:click={toggleCapsule}>
									<EyeOff class="h-4 w-4 cursor-pointer" />
								</button>
							{:else}
								<button on:click={toggleCapsule}>
									<Eye class="h-4 w-4 cursor-pointer" />
								</button>
							{/if}
						</Label>
						<div class="flex w-full justify-center">
							{#if showCapsule}
								<object
									data="/sample.pdf"
									type="application/pdf"
									width="700"
									height="1000"
									title="capsule_proposal"
									transition:fade
								/>
							{/if}
						</div>
					</div>
				</div>
				<!-- Group Information -->
				<div class="flex flex-col gap-3">
					<h1 class="text-lg font-semibold">Group Information</h1>
					<div class="grid gap-2">
						<Label for="email">Group Name</Label>
						<Input
							readonly
							name="email"
							id="email"
							type="email"
							placeholder="m@example.com"
							value={inf.group_name}
						/>
					</div>

					<div class="grid gap-2">
						<Label for="email">Leader</Label>
						<div class="flex gap-3">
							<Input
								readonly
								name="email"
								id="email"
								type="email"
								placeholder="m@example.com"
								value={inf.leader_email}
							/>
							<Input
								readonly
								name="email"
								id="email"
								type="text"
								placeholder="m@example.com"
								value={inf.leader_first_name}
							/>
							<Input
								readonly
								name="email"
								id="email"
								type="text"
								placeholder="m@example.com"
								value={inf.leader_last_name}
							/>
						</div>
					</div>
					{#each inf.members as member, i}
						<div class="grid gap-2">
							<Label for="email">Member #{i + 1}</Label>
							<div class="flex gap-3">
								<Input
									readonly
									name="email"
									id="email"
									type="email"
									placeholder="m@example.com"
									value={member.email}
								/>
								<Input
									readonly
									name="email"
									id="email"
									type="text"
									placeholder="m@example.com"
									value={member.first_name}
								/>
								<Input
									readonly
									name="email"
									id="email"
									type="text"
									placeholder="m@example.com"
									value={member.last_name}
								/>
							</div>
						</div>
					{/each}

					{#if inf.university_name}
						<div class="grid gap-2">
							<Label for="email">University Name</Label>
							<Input
								readonly
								name="email"
								id="email"
								type="email"
								placeholder="m@example.com"
								value={inf.university_name}
							/>
						</div>
					{/if}
				</div>
				<!-- Calculator -->
				<div class="flex flex-col gap-3">
					<h1 class="text-lg font-semibold">Readiness Level</h1>
					<div class="p-10">
						<RadarChart
							id={inf.id}
							min={0}
							max={9}
							data={[
								lev.filter((r) => r.readiness_type === 'Technology')[0].readiness_level,
								lev.filter((r) => r.readiness_type === 'Organizational')[0].readiness_level,
								lev.filter((r) => r.readiness_type === 'Market')[0].readiness_level,
								lev.filter((r) => r.readiness_type === 'Regulatory')[0].readiness_level,
								lev.filter((r) => r.readiness_type === 'Acceptance')[0].readiness_level,
								lev.filter((r) => r.readiness_type === 'Investment')[0].readiness_level,
							]}
							labels={[
								'Technology',
								'Organizational',
								'Market',
								'Regulatory',
								'Acceptance',
								'Investment'
							]}
						/>
					</div>
				</div>
			</div>
		</div></Dialog.Content
	>
</Dialog.Root>
