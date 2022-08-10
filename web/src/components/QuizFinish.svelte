<script>
    import { navigate } from 'svelte-navigator';

    import axios from '../lib/axios';
    import { loading, auth } from '../lib/store';
    import quiz from '../data/quiz.json';

    import LayoutMain from '../layouts/Main.svelte';
    import Button from '../shared/Button.svelte';
    import Alert from '../shared/Alert.svelte';

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
    <div class="quiz-finish">
        <h2>Welcome, {$auth.user.fullname}</h2>
        <form on:submit|preventDefault={handleSubmit}>
            <h4>{quiz.name}</h4>
            <Button>See My Score</Button>
        </form>

        {#if error}
            <Alert>{error}</Alert>
        {/if}
    </div>
</LayoutMain>

<style lang="scss">
    .quiz-finish {
        padding: 10px 0;
        h2 {
            margin-bottom: 20px;
        }

        form {
            padding: 20px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 10px;
        }
    }
</style>
