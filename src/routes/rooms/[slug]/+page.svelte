<script>
    import { onMount } from 'svelte';
	import { existsRoom } from '$lib/api';

    import ChatHistories from '$lib/Components/ChatHistories.svelte';
	import ChatInput from '$lib/Components/ChatInput.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    // 部屋名
    const name = data.name;
    let roomNameValidated = false;

    onMount(async () => {
        const exists = await existsRoom(name);
        if (exists){
            roomNameValidated = true; 
            return; 
        }

        alert('部屋が存在しません。部屋を登録してください。');
        document.location.href = `/`;
	});
</script>

{#if roomNameValidated}
    <ChatHistories />
    <ChatInput />    
{/if}
