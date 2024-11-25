<script lang="ts">
	import Check from "svelte-radix/Check.svelte";

	let { name, readonly = false, value, checked } = $props()
</script>

<div class="w-full h-full flex items-center justify-center">
	<div class='relative flex items-center justify-center w-fit '>
		<label for={name}></label>
		<input
			type='radio'
			name={name}
			{readonly}
			value={value}
			checked={checked}
			class="peer appearance-none aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<Check class='hidden peer-checked:block h-3.5 w-3.5 fill-primary absolute text-primary' />
	</div>
</div>
