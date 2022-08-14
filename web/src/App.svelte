<script>
    import { Router, Route } from 'svelte-navigator';
    import Auth from './components/Auth.svelte';

    import Login from './pages/Login.svelte';
    import Logout from './pages/Logout.svelte';
    import Result from './pages/Result.svelte';
    import Root from './pages/Root.svelte';
    import NotFound from './pages/404.svelte';

    import { loading } from './lib/store';
</script>

<main class:loading={$loading}>
    <Auth>
        <Router>
            <Route path="/" component={Root} />
            <Route path="/result" component={Result} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/*" component={NotFound} />
        </Router>
    </Auth>
</main>

<style lang="scss">
    main {
        min-height: 100vh;
    }
    main.loading {
        position: relative;

        &::after {
            content: 'Loading';
            position: absolute;
            background: rgba(#fff, 0.6);
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
</style>
