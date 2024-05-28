<script lang="ts">
    import Sidebar from "$lib/components/shared/Sidebar.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
</script>

<Toaster />
<div class="flex w-full bg-muted/40">
    <Sidebar />
    <slot />
</div>