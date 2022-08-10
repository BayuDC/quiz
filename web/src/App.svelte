<script>
    import { Router, Route } from 'svelte-navigator';
    import Auth from './components/Auth.svelte';
    import Container from './components/Container.svelte';
    import Login from './pages/Login.svelte';
    import Result from './pages/Result.svelte';
    import Root from './pages/Root.svelte';
    import NotFound from './pages/404.svelte';
</script>

<main>
    <Auth>
        <Container>
            <Router>
                <Route path="/" component={Root} />
                <Route path="/result" component={Result} />
                <Route path="/login" component={Login} />
                <Route path="/*" component={NotFound} />
            </Router>
        </Container>
    </Auth>
</main>
