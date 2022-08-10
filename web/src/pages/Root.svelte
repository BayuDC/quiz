<script>
    import { onMount } from 'svelte';
    import axios from '../lib/axios';
    import { loading } from '../lib/store';

    import Guard from '../components/Guard.svelte';
    import Quiz from '../components/Quiz.svelte';
    import QuizStart from '../components/QuizStart.svelte';
    import QuizFinish from '../components/QuizFinish.svelte';

    let started = false;
    let finished = false;
    let question;

    const fetchQuiz = async () => {
        loading.set(true);
        try {
            const { data } = await axios.get('/quiz');
            question = data.question;
            started = true;
        } catch (err) {
            if (err.response.status == 425) started = false;
            if (err.response.status == 410) {
                started = false;
                finished = true;
            }
        }
        loading.set(false);
    };

    onMount(fetchQuiz);

    $: {
        if (started) fetchQuiz();
    }
</script>

<Guard>
    {#if !$loading}
        {#if started}
            <Quiz {question} on:next={fetchQuiz} />
        {:else if finished}
            <QuizFinish />
        {:else}
            <QuizStart on:started={() => (started = true)} />
        {/if}
    {/if}
</Guard>
