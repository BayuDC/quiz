<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import { loading } from '../lib/store';
    import axios from '../lib/axios';
    import quiz from '../data/quiz.json';
    import LayoutMain from '../layouts/MainClear.svelte';
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
        <h3 class="margin-bottom">{quiz.name}</h3>
        {#if result}
            <ul>
                <li class="background-secondary score">
                    <p>Score</p>
                    <span>{result.score}</span>
                </li>
                <li class="background-success">
                    <p>Total Questions</p>
                    <span>{result.totalQuestion}</span>
                </li>
                <li class="background-warning">
                    <p>Correct Answers</p>
                    <span>{result.correctAnswer}</span>
                </li>
            </ul>
        {/if}
    </LayoutMain>
</Guard>

<style lang="scss">
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        li {
            padding: 20px;
            p {
                margin-bottom: 10px;
            }

            span {
                font-size: 50px;
                font-weight: 700;
            }

            &::before {
                display: none;
            }

            &.score {
                grid-column: 1 / 3;
            }
        }
    }
</style>
