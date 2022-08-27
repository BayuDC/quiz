export default () =>
    new WebSocket(
        import.meta.env.PROD
            ? document.URL.replace(/http/, 'ws') + 'api/auth/present'
            : 'ws://127.0.0.1:8080/api/auth/present'
    );
