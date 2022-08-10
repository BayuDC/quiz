<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';
    import LayoutMain from '../layouts/Main.svelte';
    import Guard from '../components/Guard.svelte';

    let result;

    onMount(async () => {
        loading.set(true);
        try {
            const { data } = await axios.get('/quiz/result');
            result = data;
        } catch {
            navigate('/');
        }
        loading.set(false);
    });
</script>

<Guard>
    <LayoutMain>
        <div class="page-result">
            <h2>{quiz.name}</h2>
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
        padding: 10px 0;
        h2 {
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
