<script>
    import { navigate } from 'svelte-navigator';

    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';

    import LayoutCard from '../layouts/Card.svelte';
    import Button from '../shared/Button.svelte';
    import Alert from '../shared/Alert.svelte';

    let error = '';

    const handleSubmit = async () => {
        try {
            await axios.post('/quiz/finish');
            navigate('/result');
        } catch (err) {
            if (err.response.status == 410) return navigate('/result');
            error = err.response.data.message || 'Something went wrong';
        }
    };
</script>

<LayoutCard>
    <form action="" on:submit|preventDefault={handleSubmit}>
        <h4>{quiz.name}</h4>
        <p><b>{quiz.count}</b> Questions</p>
        {#if error}
            <Alert>{error}</Alert>
        {/if}
        <Button>See Quiz Result</Button>
    </form>
</LayoutCard>

<style lang="scss">
    form {
        h4 {
            margin-bottom: 10px;
        }
    }
</style>
