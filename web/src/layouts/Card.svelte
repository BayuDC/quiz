<div class="layout-card">
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
    }
</style>
