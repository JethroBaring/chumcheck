<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { RocketIcon } from 'lucide-svelte';
	import { StartupCard } from '$lib/components/startups';
	import { Can, RadarChart } from '$lib/components/shared';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { Role } from '$lib/types.js';
	import { getData } from '$lib/utils.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import Application from '$lib/components/startup/Application.svelte';
	import * as Table from '$lib/components/ui/table';
	import html2canvas from 'html2canvas';
	import { PDFDocument } from 'pdf-lib';

	let { data } = $props();

	const queryResult = useQuery('startupData', () =>
		getData(`/startups/${data.startupId}/progress-report`, data.access!)
	);

	$effect(() => {
		if ($queryResult.isSuccess) {
			console.log($queryResult.data);
		}
	});

	const downloadMultiPagePDF = async () => {
		try {
			// Select all the pages to capture
			const pages = document.querySelectorAll('.pdf-page');

			if (pages.length === 0) {
				alert('No pages found!');
				return;
			}

			// Create a new PDF document
			const pdfDoc = await PDFDocument.create();

			for (const pageElement of pages) {
				// Capture the current element as a canvas
				const canvas = await html2canvas(pageElement, {
					scale: 2, // Increases the resolution
					useCORS: true // Avoid cross-origin issues
				});

				// Convert the canvas to an image
				const imageData = canvas.toDataURL('image/png');

				// Get the dimensions of the canvas
				const { width, height } = canvas;

				// Add a new page to the PDF with dimensions matching the canvas
				const pdfPage = pdfDoc.addPage([width, height]);

				// Embed the PNG image into the PDF
				const pngImage = await pdfDoc.embedPng(imageData);
				pdfPage.drawImage(pngImage, {
					x: 0,
					y: 0,
					width,
					height
				});
			}

			// Serialize the PDF document to bytes
			const pdfBytes = await pdfDoc.save();

			// Trigger a download
			const blob = new Blob([pdfBytes], { type: 'application/pdf' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = 'multi-page-document.pdf';
			link.click();
		} catch (error) {
			console.error('Error generating multi-page PDF:', error);
		}
	};

	let divRef: HTMLDivElement;

	$effect(() => {
		if (divRef) {
			console.log(divRef.clientHeight);
		}
	});
</script>
<svelte:head>
	<title
		>{$queryResult.isSuccess
			? `${$queryResult.data.name} - Readiness and Needs Assessment`
			: 'Loading'}</title
	>
</svelte:head>
<div class="flex">
	<Button class="ml-auto" onclick={downloadMultiPagePDF}>Download</Button>
</div>

{#snippet readiness()}{/snippet}

{#snippet rna()}{/snippet}

{#snippet rns()}{/snippet}

{#snippet roadblocks()}{/snippet}

{#if $queryResult.isLoading}
	<!-- content here -->
{:else}
	<div class="h-full overflow-scroll">
		<Card.Root class="pdf-page h-full">
			<Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
				<div class="w-full text-center text-3xl font-bold">ChumCheck Progress Report</div>
				<div class="mt-10 flex flex-col gap-2">
					<p>I. Readiness Levels</p>
					<div class="flex items-center justify-center">
						<RadarChart
							id={1231231}
							min={1}
							max={9}
							data={[1, 2, 3, 4, 5, 6]}
							labels={[1, 2, 3, 4, 5, 6]}
						/>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root class="pdf-page mt-3 h-full">
			<Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
				<div class="mt-10 flex flex-col gap-2">
					<p>II. RNA Result Summary(Based on Readiness and Needs Assessment)</p>
					<div class="rounded-md border">
						<Table.Root class="rounded-lg bg-background">
							<Table.Header>
								<Table.Row class="text-centery h-12">
									<Table.Head class="pl-5">Readiness Type</Table.Head>
									<Table.Head>Current Level</Table.Head>
									<Table.Head>Details</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each $queryResult.data.rnas as rna, index}
									{#if index < 6}
										<Table.Row class="h-14 cursor-pointer">
											<Table.Cell class="w-48 pl-5">{rna.readiness_type_rl_type}</Table.Cell>
											<Table.Cell class="w-40">{rna.readiness_level_level}</Table.Cell>
											<Table.Cell>{rna.rna}</Table.Cell>
										</Table.Row>
									{/if}
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root class="pdf-page mt-3 h-full">
			<Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
				<div class="mt-10 flex flex-col gap-2">
					<p>III. RECOMMENDED NEXT STEPS (RNS) - SHORT TERM</p>
					{#each $queryResult.data.tasks as rns, index}
						<div class="rounded-md border">
							<Table.Root class="rounded-lg bg-background">
								<Table.Header>
									<Table.Row class="text-centery h-12">
										<Table.Head class="pl-5">Priority Number</Table.Head>
										<Table.Head>Readiness Type</Table.Head>
										<Table.Head>Target Level</Table.Head>
										<Table.Head>Description</Table.Head>
										<Table.Head>Status</Table.Head>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row class="h-14 cursor-pointer">
										<Table.Cell class="w-48 pl-5">{rns.priority_number}</Table.Cell>
										<Table.Cell class="w-40">{rns.readiness_type_rl_type}</Table.Cell>
										<Table.Cell>{rns.target_level}</Table.Cell>
										<Table.Cell>{rns.description}</Table.Cell>
										<Table.Cell>{rns.status}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table.Root>
						</div>
						<!-- <div class="rounded-md border">
						<Table.Root class="rounded-lg bg-background">
							<Table.Header>
								<Table.Row class="text-centery h-12">
									<Table.Head class="pl-5">Priority Number</Table.Head>
									<Table.Head>Readiness Type</Table.Head>
									<Table.Head>Target Level</Table.Head>
									<Table.Head>Description</Table.Head>
									<Table.Head>Status</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row class="h-14 cursor-pointer">
									<Table.Cell class="w-48 pl-5">{rns.readiness_type_rl_type}</Table.Cell>
									<Table.Cell class="w-40">{rns.readiness_level_level}</Table.Cell>
									<Table.Cell>{rns.rna}</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>
					</div> -->
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root class="pdf-page mt-3 h-full">
			<Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
				<div class="mt-10 flex flex-col gap-2">
					<p>IV. RISKS AND ROADBLOCKS - SHORT TERM AND LONG TERM</p>
					<div class="rounded-md border">
						<Table.Root class="rounded-lg bg-background">
							<Table.Header>
								<Table.Row class="text-centery h-12">
									<Table.Head class="pl-5">Readiness Type</Table.Head>
									<Table.Head>Current Level</Table.Head>
									<Table.Head>Details</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each $queryResult.data.roadblocks as roadblock, index}
									{#if index < 3}
										<Table.Row class="h-14 cursor-pointer">
											<Table.Cell class="w-40 pl-5">{roadblock.risk_number}</Table.Cell>
											<Table.Cell class="">{roadblock.description}</Table.Cell>
											<Table.Cell>{roadblock.fix}</Table.Cell>
											<Table.Cell>{roadblock.assignee_last_name}</Table.Cell>
										</Table.Row>
									{/if}
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
{/if}
