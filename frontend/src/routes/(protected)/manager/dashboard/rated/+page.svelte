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
	import RadarChart from '$lib/components/shared/RadarChart.svelte';
	import { fade } from 'svelte/transition';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	const access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzEyMDQ2LCJpYXQiOjE3MTcwNTI4NDYsImp0aSI6ImM5ZmQ0ODA2MjhkZDRiOWNiMjNhYjU3ZTRjY2I4MzFlIiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.d_W0LM7ljx5NF4NQ4czZzA5I0bWM7-4ux80yJvMzC-w';
	export let data;
	let applicants = data.applicants.filter((d) => d.qualification_status === 2);
	let showCapsule = false;

	function toggleCapsule() {
		showCapsule = !showCapsule;
	}
	let inf: any, que, ans, calc;
	let trl = 0,
		orl = 0,
		mrl = 0,
		rrl = 0,
		arl = 0,
		irl = 0;

	let showRatedDialog = false;

	function toggleRatedDialog() {
		showRatedDialog = !showRatedDialog;
	}

	async function getStartupInformation(startupId: number) {
		const response = await fetch(`http://127.0.0.1:8000/startups/${startupId}/`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();
		if (response.ok) {
			const urat_questions = await fetch('http://127.0.0.1:8000/readinesslevel/urat-questions/', {
				method: 'get',
				headers: {
					Authorization: `Bearer ${access}`
				}
			});

			const questions_data = await urat_questions.json();

			const urat_answers = await fetch(
				`http://127.0.0.1:8000/urat-question-answers/?startup_id=${startupId}`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const answers_data = await urat_answers.json();

			const calculator = await fetch(
				`http://127.0.0.1:8000/startups/${startupId}/calculator-final-scores/`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const calculator_data = await calculator.json();

			if (urat_questions.ok && urat_answers.ok && calculator.ok) {
				inf = data;
				que = questions_data.results;
				ans = answers_data.results;
				calc = calculator_data;
				trl = ans
					.filter((d) => d.readiness_type === 'Technology')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				orl = ans
					.filter((d) => d.readiness_type === 'Organizational')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				mrl = ans
					.filter((d) => d.readiness_type === 'Market')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				rrl = ans
					.filter((d) => d.readiness_type === 'Regulatory')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				arl = ans
					.filter((d) => d.readiness_type === 'Acceptance')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				irl = ans
					.filter((d) => d.readiness_type === 'Investment')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				toggleRatedDialog();
			}
		}
	}

	async function approveStartup(startupId: number) {
		const response = await fetch(`http://127.0.0.1:8000/startups/${startupId}/approve-applicant/`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		if (response.ok) {
			const assignmentor = await fetch(
				`http://127.0.0.1:8000/startups/${selectedMentor}/appoint-mentors/`,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access}`
					},
					body: JSON.stringify({
						mentor_ids: [selectedMentor.toString()]
					})
				}
			);

			if (assignmentor.ok) {
				const filtered = applicants.filter((d) => d.id !== startupId);
				applicants = filtered;
			}
			toggleRatedDialog();
		}
	}

	async function rejectStartup(startupId: number) {
		const response = await fetch(`http://127.0.0.1:8000/startups/${startupId}/reject-applicant/`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		if (response.ok) {
			return {
				message: 'email has been sent to the applicant'
			};
		}
	}

	let selectedMentor = data.mentors[0].id;
</script>

<Tabs.Content value="rated">
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

<Dialog.Root open={showRatedDialog} onOpenChange={toggleRatedDialog}>
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
					<h1 class="text-lg font-semibold">Technology and Commercialization Calculator</h1>
					<div>Technology: {calc.technology_level}</div>
					<div>Commercialization: {calc.commercialization_level}</div>
					<div class="p-10">
						<RadarChart
							id={inf.id}
							min={0}
							max={5}
							data={[
								calc.technology_score,
								calc.product_development,
								calc.product_definition,
								calc.competitive_landscape,
								calc.team,
								calc.go_to_market,
								calc.supply_chain
							]}
							labels={[
								'Technology',
								'Product Development',
								'Product Definition',
								'Competitive Landscape',
								'Team',
								'Go-To-Market',
								'Supply Chain'
							]}
						/>
					</div>
				</div>
				<!-- URAT Assessment -->
				<div class="flex flex-col gap-3">
					<h1 class="text-lg font-semibold">URAT Assessment</h1>
					<div class="p-20">
						<RadarChart
							id={inf.id + 100}
							min={0}
							max={15}
							data={[trl, orl, mrl, rrl, arl, irl]}
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
				<div class="flex flex-col gap-3">
					<h1 class="text-lg font-semibold">Assign Mentor</h1>

					<Select.Root
						selected={selectedMentor.value}
						onSelectedChange={(v) => {
							v && (selectedMentor = v.value);
						}}
					>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Choose a mentor" />
						</Select.Trigger>
						<Select.Content>
							{#each data.mentors as mentor}
								<Select.Item value={mentor.id}
									>{`${mentor.first_name} ${mentor.last_name}`}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex justify-end gap-3">
					<Button variant="destructive">Reject</Button>
					<Button on:click={() => approveStartup(inf.id)}>Approve</Button>
				</div>
			</div>
		</div></Dialog.Content
	>
</Dialog.Root>
