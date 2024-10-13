<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	export let currentActive: number;
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Spinner from 'lucide-svelte/icons/loader-circle';

	let files: any;

	let processing = false;
	let information: {
		title: string;
		startup_description: string;
		problem_statement: string;
		target_market: string;
		solution_description: string;
		objectives: string;
		scope: string;
		methodology: string;
	};
	async function getInformation() {
		processing = true;
		if (!files || !files[0]) {
			console.error('No file selected');
			return;
		}

		const formData = new FormData();
		formData.append('capsule_proposal', files[0]);

		const response = await fetch(`${PUBLIC_API_URL}/capsule-proposal-infos/extract-info/`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzA3MTA2LCJpYXQiOjE3MTcwNDc5MDYsImp0aSI6ImI0NmQ1NTBiMzk2NDQyMDY5N2VlY2U3ZGIyNTc1YjM1IiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiUyJ9.MAurYWvb8pQ_KV6UBajOfj_Bq8-huQjgCohxqo2MJCI`
			},
			body: formData
		});

		const data = await response.json();

		if (response.ok) {
			information = data;
			console.log(data);
		}

		processing = false;
	}

	$: if (files) {
		getInformation();
	}
</script>

<div class="flex-1 overflow-scroll px-1" class:hidden={currentActive !== 2}>
	<div class="flex h-0 flex-col gap-5">
		<div class="grid gap-2">
			<Label for="startup_name">Startup name</Label>
			<Input
				name="startup_name"
				id="startup_name"
				type="text"
				placeholder="m@example.com"
				required
			/>
		</div>
		<div class="grid gap-2">
			<Label>Capsule Proposal</Label>
			<label
				for="capsule_proposal"
				class="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm"
			>
				{#if files}
					{#if processing}
						<div class="flex flex-col items-center justify-center gap-3">
							<Spinner class="mr-2 h-6 w-6 animate-spin" />
							<h2 class="text-sm">Processing your capsule proposal...</h2>
						</div>
					{:else}
						<div>{files[0].name}</div>
					{/if}
				{:else}
					Upload or drag your capsule proposal here.
				{/if}
			</label>
			<input
				id="capsule_proposal"
				name="capsule_proposal"
				class="hidden"
				type="file"
				accept=".pdf"
				bind:files
			/>
		</div>
		{#if files && !processing}
			<input type="hidden" name="title" value={information.title} />
			<input type="hidden" name="startupDescription" value={information.startup_description} />
			<input type="hidden" name="problemStatement" value={information.problem_statement} />
			<input type="hidden" name="targetMarket" value={information.target_market} />
			<input type="hidden" name="solutionDescription" value={information.solution_description} />
			<input type="hidden" name="objectives" value={information.objectives} />
			<input type="hidden" name="scope" value={information.scope} />
			<input type="hidden" name="methodology" value={information.methodology} />
		{/if}
		<div class="grid gap-2">
			<Label for="links">Links to any supporting materials (e.g., website, explainer video)</Label>
			<Input name="links" id="links" type="text" placeholder="links" required />
		</div>
	</div>
</div>
