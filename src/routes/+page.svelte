<script>
	import { signInWithGoogle, signOutWithGoogle } from "$lib/firebase";
	import { UserId } from "$lib/store";
	import { onDestroy } from "svelte";

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
</script>

<main>
    <div>
        {#if uid}
            <a
                class="block"
                href="#/"
                on:click={signOutWithGoogle}>Logout</a
            >
        {:else}
            <a
                class="block"
                href="#/"
                on:click={signInWithGoogle}>Login</a
            >
        {/if}
    </div>
</main>