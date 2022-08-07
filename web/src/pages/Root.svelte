<script>
    import { onMount } from 'svelte';
    import axios from '../lib/axios';

    import Guard from '../components/Guard.svelte';
    import Quiz from '../components/Quiz.svelte';
    import QuizStart from '../components/QuizStart.svelte';

    let pending = true;
    let started = false;
    let finished = false;
    let question;

    onMount(async () => {
        pending = true;
        try {
            const { data } = await axios.get('/quiz');
            question = data.question;
            started = true;
        } catch (err) {
            if (err.response.status == 425) started = false;
            if (err.response.status == 410) finished = true;
        }
        pending = false;
    });
</script>

<Guard>
    {#if !pending}
        {#if started}
            <Quiz {question} />
        {:else}
            <QuizStart on:started={() => (started = true)} />
        {/if}
    {/if}
</Guard>
