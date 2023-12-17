import SetAuthDataMiddleware from '../../Middlewares/setAuthDataMiddleware'
export default {
    // refreshInterval: 1000,
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
    use: [SetAuthDataMiddleware]
}
