<script>
	import { onDestroy, onMount } from 'svelte';
	import { onSnapshotMessages } from '$lib/api';
	import { SnapshotMessages } from '$lib/store';
	import ChatHistory from './ChatHistory.svelte';

	export let roomId = '';
	/**
	 * @type {import('svelte/store').Unsubscriber}
	 */
	let unsubscribeStore;
	/**
	 * @type {import('firebase/firestore').Unsubscribe}
	 */
	let unsubscribeFirestore;
	/**
	 * @type {string[]}
	 */
	let messages = [];
	onMount(async () => {
		try {
			unsubscribeFirestore = onSnapshotMessages(roomId);
			unsubscribeStore = SnapshotMessages.subscribe((value) => {
				messages = value;
			});
		} catch (e) {
			alert('faild fetchMessages');
		}
	});

	onDestroy(() => {
		unsubscribeFirestore;
		unsubscribeStore;
	});
</script>

<div class="m-5">
	{#each messages as message}
		<ChatHistory {message} />
	{/each}
</div>
