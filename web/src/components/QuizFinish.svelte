<script>
    import { navigate } from 'svelte-navigator';
    import { Card, Button, Alert } from 'spaper';

    import { loading } from '../lib/store';
    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';

    import LayoutMain from '../layouts/Main.svelte';

    let error = '';

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
</script>

<LayoutMain>
    <Card title={quiz.name}>
        <form on:submit|preventDefault={handleSubmit}>
            {#if error}
                <Alert type="danger">{error}</Alert>
            {/if}
            <Button type="secondary" slot="bottom" size="large">See My Score</Button>
        </form>
    </Card>
</LayoutMain>
