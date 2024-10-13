	
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox";
 
  let checked: boolean = $state(false)
</script>
 
<Checkbox bind:checked={checked as boolean} />

