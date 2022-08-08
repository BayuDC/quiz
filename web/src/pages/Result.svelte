<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';
    import LayoutMain from '../layouts/Main.svelte';
    import Guard from '../components/Guard.svelte';

    let result;

    onMount(async () => {
        try {
            const { data } = await axios.get('/quiz/result');
            result = data;
        } catch {
            navigate('/');
        }
    });
</script>

<Guard>
    <LayoutMain>
        <div class="page-result">
            <h2>Quiz Result</h2>
            <h4>{quiz.name}</h4>
            {#if result}
                <ul>
                    <li class="score">
                        <p>Score</p>
                        <span>{result.score}</span>
                    </li>
                    <li>
                        <p>Total Questions</p>
                        <span>{result.totalQuestion}</span>
                    </li>
                    <li>
                        <p>Correct Answers</p>
                        <span>{result.correctAnswer}</span>
                    </li>
                </ul>
            {/if}
        </div>
    </LayoutMain>
</Guard>

<style lang="scss">
    @import '../styles/mixin';

    .page-result {
        h2,
        h4 {
            margin-bottom: 10px;
        }

        ul {
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 10px;

            li {
                padding: 20px;
                background: #ffffff;

                span {
                    font-size: 50px;
                    font-weight: 700;
                }
            }
        }
    }
</style>
