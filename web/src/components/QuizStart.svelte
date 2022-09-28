<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { Card, Button, Alert } from 'spaper';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';

    import LayoutMain from '../layouts/Main.svelte';

    let error = '';
    let quizName = '';

    const dispatch = createEventDispatcher();
    const handleSubmit = async e => {
        loading.set(true);
        try {
            await axios.post('/quiz/start');
            dispatch('started');
        } catch (err) {
            error = err.response.data.message || 'Something went wrong';
        }
        loading.set(false);
    };

    onMount(async () => {
        const res = await axios.get('/quiz/data');

        quizName = res.data.name;
    });
</script>

<LayoutMain>
    <Card title={quizName}>
        <form on:submit|preventDefault={handleSubmit}>
            {#if error}
                <Alert type="danger">{error}</Alert>
            {/if}
            <Button type="secondary" slot="bottom" size="large">Start the Quiz</Button>
        </form>
    </Card>
</LayoutMain>
