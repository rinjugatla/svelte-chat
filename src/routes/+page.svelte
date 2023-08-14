<script>
	import { postMessage } from '$lib/api';
	import { UserId } from '$lib/store';
	import { onDestroy } from 'svelte';
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