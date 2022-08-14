<div class="layout-card">
    <div class="paper container-xs">
        <h2>TheQuiz</h2>
        <slot />
    </div>
</div>

<style lang="scss">
    .layout-card {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .container-xs {
            background: #fff;
            width: 100%;
            max-width: 420px;
            position: relative;

            h2 {
                text-align: center;
                outline: none;
            }
        }
    }
</style>
