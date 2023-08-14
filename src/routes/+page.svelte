<script>
	import { postMessage, fetchMessages, onSnapshotMessages } from '$lib/api';
	import { signInWithGoogle, signOutWithGoogle } from '$lib/firebase';
	import { UserId, SnapshotMessages } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';
	import { Textarea, Label, Button } from 'flowbite-svelte';
	import ChatHistories from '$lib/Components/ChatHistories.svelte';

	/**
	 * @type {string}
	 */
	let uid;
	const unsubscribe = UserId.subscribe((id) => {
		uid = id;
	});
	onDestroy(() => {
		unsubscribe();
	});

	// dbから取得したメッセージ
	// let promiseMessages = fetchMessages();
	// onMount(async () => {
	// 	try {
	// 		promiseMessages = await fetchMessages();
    //         console.log(`promiseMessages: ${promiseMessages}`);
	// 	} catch (e) {
	// 		alert('faild fetchMessages');
	// 	}
	// });
    
	// dbに送信するメッセージ
	let message = '';
    
	let posting = false;

	const submit = async () => {
		posting = true;
		const result = await postMessage(message);
		if (result) {
			// alert(result);
		} else {
			alert('チャットの送信に失敗しました。');
		}

		message = '';
		posting = false;
	};
</script>

<div>
    {#if uid}
        <a class="block" href="#/" on:click={signOutWithGoogle}>Logout</a>
    {:else}
        <a class="block" href="#/" on:click={signInWithGoogle}>Login</a>
    {/if}
</div>

<ChatHistories />

<div>
    {#if uid}
        <form class="p-5">
            <div>
                <Label for="message" class="mb-4">メッセージ</Label>
                <Textarea id="message" placeholder="" rows="1" bind:value={message} />
            </div>
            <Button disabled={posting || message.length == 0} on:click={submit}>送信</Button>
        </form>
    {/if}
</div>