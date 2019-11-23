import { useContext, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { css } from '@emotion/core';
import Input from './Input';
import Button from './Button';
import StoreContext from './StoreContext';

const style = css`
    display: flex;
    flex-direction: row;

    .auth__input {
        flex: 1;
    }

    .auth__button {
        padding-left: 10px;
    }
`;

const Auth: React.FC = () => {
    const storeContext = useContext(StoreContext);
    const [key, setKey] = useState('');

    const connect = () => {
        storeContext.connect(key);
    };

    return useObserver(() => (
        <div css={style}>
            <div className="auth__input">
                <Input
                    placeholder="Please enter your storage key here..."
                    value={key}
                    type="password"
                    disabled={
                        storeContext.pending || storeContext.isAuthenticated
                    }
                    onChange={setKey}
                />
            </div>
            <div className="auth__button">
                {storeContext.isAuthenticated ? (
                    <Button onClick={storeContext.disconnect}>
                        Disconnect
                    </Button>
                ) : (
                    <Button
                        disabled={0 === key.length}
                        pending={storeContext.pending}
                        onClick={connect}
                    >
                        Connect
                    </Button>
                )}
            </div>
        </div>
    ));
};

export default Auth;
