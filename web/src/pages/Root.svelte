<script>
    import Guard from '../components/Guard.svelte';
    import Quiz from '../components/Quiz.svelte';
    import QuizStart from '../components/QuizStart.svelte';

    let started = false;
</script>

<Guard>
    {#if started}
        <Quiz />
    {:else}
        <QuizStart on:started={() => (started = true)} />
    {/if}
</Guard>
