<script>
    export let loading = false;
</script>

<div class="layout-card" class:loading>
    <div class="wrapper">
        <h1>TheQuiz</h1>
        <hr />
        <slot />
    </div>
</div>

<style lang="scss">
    @import '../styles/variable';

    .layout-card {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrapper {
            background: #fff;
            padding: 20px;
            width: 100%;
            max-width: 360px;
            position: relative;

            h1 {
                font-size: 28px;
                padding: 10px 0;
                text-align: center;
            }

            hr {
                margin-bottom: 20px;
            }

            & :global(button) {
                margin-top: 20px;
                margin-left: auto;
            }
            & :global(.alert) {
                margin-top: 20px;
            }
        }

        &.loading {
            .wrapper::before {
                content: 'Loading...';
                background: rgba(#fff, 0.6);
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: 700;
                animation: 0.9s loading infinite;

                @keyframes loading {
                    0% {
                        content: 'Loading';
                    }
                    33% {
                        content: 'Loading.';
                    }
                    66% {
                        content: 'Loading..';
                    }
                    100% {
                        content: 'Loading...';
                    }
                }
            }
        }
    }
</style>
