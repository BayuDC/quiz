<script>
    import { createEventDispatcher } from 'svelte';
    import { Card, Button, Alert } from 'spaper';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';

    import LayoutMain from '../layouts/Main.svelte';

    let error = '';

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
</script>

<LayoutMain>
    <Card title={quiz.name}>
        <form on:submit|preventDefault={handleSubmit}>
            {#if error}
                <Alert type="danger">{error}</Alert>
            {/if}
            <Button type="secondary" slot="bottom" size="large">Start the Quiz</Button>
        </form>
    </Card>
</LayoutMain>
