import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';
import Layout from 'components/Layout';
import Auth from 'components/Auth';
import HR from 'components/HR';
import FileBrowser from 'components/FileBrowser';
import StoreContext from 'components/StoreContext';
import Hint from 'components/Hint';

const files = [
    {
        name: 'Test file.docx',
        creationTime: new Date(),
        lastModified: new Date(),
        etag: '',
        contentLength: 1024
    }
];

const Index: React.FC = () => {
    const storeContext = useContext(StoreContext);

    return useObserver(() => (
        <Layout
            header={
                <div>
                    <Auth />
                    <HR />
                </div>
            }
        >
            {storeContext.isAuthenticated ? (
                <FileBrowser files={files as any} />
            ) : (
                <Hint>Please connect to the server</Hint>
            )}
        </Layout>
    ));
};

export default Index;
