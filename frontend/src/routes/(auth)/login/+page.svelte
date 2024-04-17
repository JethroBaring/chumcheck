<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import UserAuthForm from './form.svelte';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<div class="md:hidden">
	<img width={1280} height={843} alt="Authentication" class="block dark:hidden" />
	<img width={1280} height={843} alt="Authentication" class="hidden dark:block" />
</div>

<div class="flex h-screen w-screen items-center justify-center p-20">
	<Card.Root
		class="container relative hidden h-[800px] w-4/5 flex-col items-center justify-center rounded-lg  bg-white shadow-lg dark:bg-[#020817] md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
	>
		<Button href="/application" variant="ghost" class="absolute right-4 top-4 md:right-8 md:top-8">
			Apply
		</Button>
		<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
			<div
				class="absolute inset-0 bg-cover"
				style="
				background-image:
					url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80);"
			/>
			<div class="relative z-20 flex items-center text-lg font-medium">
				<!-- <Command class="mr-2 h-6 w-6" /> -->
				ChumCheck 
			</div>
			<div class="relative z-20 mt-auto">
				<blockquote class="space-y-2">
					<p class="text-lg">
						&ldquo;This library has saved me countless hours of work and helped me deliver stunning
						designs to my clients faster than ever before. Highly recommended!&rdquo;
					</p>
					<footer class="text-sm">Sofia Davis</footer>
				</blockquote>
			</div>
		</div>
		<div class="lg:p-8">
			<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div class="flex flex-col space-y-2 text-center">
					<h1 class="text-2xl font-semibold tracking-tight">Login to your account</h1>
					<p class="text-sm text-muted-foreground">
						Enter your email and password below to proceed
					</p>
				</div>
				<UserAuthForm />
			</div>
		</div>
	</Card.Root>
</div>
