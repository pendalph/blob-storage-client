import NextApp from 'next/app';
import Head from 'next/head';
import StoreContext from 'components/StoreContext';
import store from 'stores';

class App extends NextApp {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <StoreContext.Provider value={store}>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/file-icon-vectors@1.0.0/dist/file-icon-square-o.min.css"
                    />
                </Head>
                <Component {...pageProps} />
            </StoreContext.Provider>
        );
    }
}

export default App;
