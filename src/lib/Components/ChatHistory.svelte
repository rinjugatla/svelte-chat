<script>
	import { Toast } from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';

	export let message = '';
</script>

<Toast
	simple
	contentClass="flex space-x-4 divide-x divide-gray-200 dark:divide-gray-700"
	divClass="w-full p-4 text-gray-500 bg-white shadow dark:text-gray-400 dark:bg-gray-800 gap-3 my-1.5"
>
	<Icon
		name="papper-plane-outline"
		class="w-5 h-5 text-primary-600 dark:text-primary-500 rotate-45"
	/>
	<div class="pl-4 text-sm font-normal break-all">{message}</div>
</Toast>
