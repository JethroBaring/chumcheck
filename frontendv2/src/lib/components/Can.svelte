<script lang="ts">
	import { permissions } from "$lib/permission";


  let { children, I, a, an } : { children: any, I: 'view' | 'create' | 'edit' | 'generate', a?: string, an?: string } = $props()

  // let role: 'startup' | 'mentor' | 'manager' = 'user'
  // const permissionToCheck = a || an;
  // let canAccess = permissionToCheck && permissions[role][I].includes(permissionToCheck!)
</script>

{#if true}
  {@render children()}
{/if}



