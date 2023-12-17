
export default function createSwrConf(setAuthDataFlag,interval=0) {
    const conf = {
        refreshInterval: interval,
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false,
        use: []
    };
    if (setAuthDataFlag) {
        conf.use = [...conf.use]
    }
    return conf;
}
