<script>
  import { runesCounter } from "$lib/stores/counter.svelte";
</script>

<h1>{runesCounter.count}</h1>
<button onclick={runesCounter.increment}>+</button>

<a href="/test">test</a>