<script lang="ts">
	import Can from '$lib/components/Can.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Store Name</Card.Title>
		<Card.Description>Used to identify your store in the marketplace.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form>
			<Input placeholder="Store Name" />
		</form>
	</Card.Content>
	<Card.Footer class="border-t px-6 py-4">
		<Button>Save</Button>
	</Card.Footer>
</Card.Root>
