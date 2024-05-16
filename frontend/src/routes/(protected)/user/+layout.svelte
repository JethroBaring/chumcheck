<script lang="ts">
    import Sidebar from "$lib/components/shared/Sidebar.svelte";
</script>

<div class="flex w-full bg-muted/40">
    <Sidebar />
    <slot />
</div>