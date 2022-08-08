<script>
    import { Router, Route } from 'svelte-navigator';
    import Auth from './components/Auth.svelte';
    import Container from './components/Container.svelte';
    import Login from './pages/Login.svelte';
    import Result from './pages/Result.svelte';
    import Root from './pages/Root.svelte';
</script>

<main>
    <Auth>
        <Container>
            <Router>
                <Route path="/" component={Root} />
                <Route path="/result" component={Result} />
                <Route path="/login" component={Login} />
            </Router>
        </Container>
    </Auth>
</main>
