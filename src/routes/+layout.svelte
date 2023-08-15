<script>
	import Header from '$lib/Common/Header.svelte';
	import '../app.postcss';
</script>

<main>
	<Header />
	<div class="pt-16">
		<slot />
	</div>
</main>
