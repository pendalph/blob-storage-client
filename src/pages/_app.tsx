import NextApp, { AppContext } from 'next/app';
import Head from 'next/head';
import StoreContext from 'components/StoreContext';
import store from 'stores';

class App extends NextApp {
    static async getInitialProps({ Component, ctx }: AppContext) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};

        return {
            pageProps
        };
    }

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
