<script lang="ts">
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Mail, Lock } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils.js';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit() {
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="flex flex-col gap-3">
			<div class="flex gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<!-- <Input
					id="password"
					type="password"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/> -->

				<div class="relative ml-auto flex-1 md:grow-0">
					<Mail class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="email"
						placeholder="Email..."
						class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[350px]"
					/>
				</div>
			</div>
			<div class="flex gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<!-- <Input
					id="password"
					type="password"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/> -->

				<div class="relative ml-auto flex-1 md:grow-0">
					<Lock class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="password"
						placeholder="Password..."
						class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[350px]"
					/>
				</div>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Login
			</Button>
		</div>
	</form>
</div>
