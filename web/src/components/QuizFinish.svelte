<script>
    import { navigate } from 'svelte-navigator';
    import { Card, Button, Alert } from 'spaper';

    import { loading } from '../lib/store';
    import axios from '../lib/axios';

    import LayoutMain from '../layouts/Main.svelte';
    import { onMount } from 'svelte';

    let error = '';
    let quizName = '';

    const handleSubmit = async () => {
        loading.set(true);
        try {
            await axios.post('/quiz/finish');
            navigate('/result');
        } catch (err) {
            if (err.response.status == 410) return navigate('/result');
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
            <Button type="secondary" slot="bottom" size="large">See My Score</Button>
        </form>
    </Card>
</LayoutMain>
