<script lang="ts">
	export let questions, answers, type;
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { PUBLIC_API_URL } from '$env/static/public';
	const access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NjI0NjA0LCJpYXQiOjE3MjUzNjQ0MzIsImp0aSI6IjM3MWQ4NWNkMjlhZTQ3NWFiY2Y3YzBkMzQ4MmFjNjk0IiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.hlZnRNMwzxM2TJZJ2twMcZhu64toUUte4iX7sMWAKMw';

        const updateScore = async (
		id: number,
		newScore: number,
	) => {
		try {
			const d = await fetch(`${PUBLIC_API_URL}/urat-question-answers/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			},
			body: JSON.stringify({
				score: newScore
			})
		});

		if (d.ok) {
			console.log('ok');
		}
		} catch (error) {
			console.log(error)
		}
	};
</script>

<div class="flex flex-col gap-3">
	<h2>{type}</h2>
	{#each questions as question, index}
		<div class="grid w-full gap-1.5">
			<Label for="message">{question.question}</Label>
			<Textarea
				placeholder="Type your message here."
				id="message"
				value={answers[index].response}
				readonly
			/>
			<input type="hidden" />
		</div>
		<RadioGroup.Root value={`${answers[index].score}`} class="flex gap-5">
			<div class="flex flex-col items-center justify-center gap-1">
				<RadioGroup.Item value="1" id="one" on:click={() => updateScore(answers[index].id, 1)}/>
				<Label for="one" class="text-[12px]">1</Label>
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<RadioGroup.Item value="2" id="two" on:click={() => updateScore(answers[index].id, 2)}/>
				<Label for="two" class="text-[12px]">2</Label>
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<RadioGroup.Item value="3" id="three" on:click={() => updateScore(answers[index].id, 3)}/>
				<Label for="three" class="text-[12px]">3</Label>
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<RadioGroup.Item value="4" id="four" on:click={() => updateScore(answers[index].id, 4)}/>
				<Label for="four" class="text-[12px]">4</Label>
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<RadioGroup.Item value="5" id="five" on:click={() => updateScore(answers[index].id, 5)}/>
				<Label for="five" class="text-[12px]">5</Label>
			</div>
			<RadioGroup.Input name="data_privacy" />
		</RadioGroup.Root>
	{/each}
</div>
