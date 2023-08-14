<script>
    import { UserId } from '$lib/store';
	import { onDestroy } from 'svelte';
    import { Textarea, Label, Button } from 'flowbite-svelte';
	import { postRoom } from '$lib/api';

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

    // 入室
	let room = '';
	let posting = false;
	const submit = async () => {
		posting = true;
		const result = await postRoom(room);
		if (result) {
			document.location.href = `/rooms/${room}`;
		} else {
			alert('ルームの作成に失敗しました。');
		}

		posting = false;
	};
</script>

<div>
    {#if uid}
        <form class="p-5">
            <div>
                <Label for="room" class="mb-4">ルーム</Label>
                <Textarea id="room" placeholder="" rows="1" bind:value={room} />
            </div>
            <div class="text-right">
                <Button disabled={posting || room.length == 0} on:click={submit}>入室</Button>    
            </div>
        </form>
    {/if}
</div>