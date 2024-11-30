<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	let { open, onOpenChange, rns, update } = $props();

  let rnsCopy = $state(rns)

  const disabled = $derived(rns === rnsCopy)
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="max-w-[600px]">
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <!-- <Label for="name" class="text-right">Name</Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" /> -->
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <!-- <Label for="username" class="text-right">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" /> -->
      </div>
    </div>
    <button onclick={() => rns.readiness_type_rl_type = 'Acceptance'}> Click me</button>
    <Dialog.Footer>
      <Button type="submit" {disabled}>Update</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
<!-- 
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

  export let open, onOpenChange, rns, update

	let rnsCopy = { ...rns }; // Create a shallow copy for comparison

	// Reactive statement to check if the current state matches the copy
	$: disabled = JSON.stringify(rns) === JSON.stringify(rnsCopy);

	function updateField(field: string, value: any) {
		rns = { ...rns, [field]: value }; // Update `rns` reactively
	}
</script>

<Dialog.Root>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="max-w-[600px]">
    <Dialog.Header>
      <Dialog.Title>{rns.readiness_type_rl_type}</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here. Click save when you're done.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        Input fields can be added here 
      </div>
    </div>
    <button onclick={() => updateField('readiness_type_rl_type', 'Acceptance')}>
      Click me
    </button>
    <Dialog.Footer>
      <Button type="submit" disabled={disabled} on:click={() => update(rns)}>
        Update
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root> -->
