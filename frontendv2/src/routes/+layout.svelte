<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors duration={2000}/>
<div class="h-screen w-screen font-Inter">
	{@render children()}
</div>
