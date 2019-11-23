import { css } from '@emotion/core';
import File from './File';
import Button from './Button';
import { FileType } from '../types';
import { useState, useCallback, useContext } from 'react';
import Hint from './Hint';
import FileInfo from './FileInfo';
import StoreContext from './StoreContext';
import React from 'react';
import { useObserver } from 'mobx-react-lite';

interface Props {
    files: FileType[];
}

const style = css`
    display: flex;
    height: 100%;

    .file-browser__list {
        flex: 1;
        border: solid 2px #ccc;
        padding: 10px;
    }

    .file-browser__aside {
        display: flex;
        margin-left: 20px;
        width: 250px;
        flex-direction: column;
    }

    .file-browser__aside__info {
        margin-top: 20px;
        flex: 1;
        background: #e0e0e0;
        padding: 20px;
    }
`;

const FileBrowser: React.FC<Props> = props => {
    const storeContext = useContext(StoreContext);
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
    const inputRef = React.createRef<HTMLInputElement>();

    const handleDeselect = useCallback(() => {
        setSelectedFile(null);
    }, [setSelectedFile]);

    const handleUpload = () => inputRef.current?.click();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        if (e.target.files?.[0]) {
            storeContext.upload(e.target.files[0]);
        }
    };

    return useObserver(() => (
        <div css={style}>
            <div className="file-browser__list" onClick={handleDeselect}>
                {props.files.map(file => (
                    <File
                        key={file.name}
                        name={file.name}
                        selected={file.name === selectedFile?.name}
                        onClick={() => setSelectedFile(file)}
                    />
                ))}
            </div>
            <div className="file-browser__aside">
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleChange}
                    style={{ position: 'absolute', top: -50000, left: -50000 }}
                />
                <Button onClick={handleUpload}>Upload</Button>
                <div className="file-browser__aside__info">
                    {selectedFile ? (
                        <FileInfo file={selectedFile} />
                    ) : (
                        <Hint>Select file to get details</Hint>
                    )}
                </div>
            </div>
        </div>
    ));
};

export default FileBrowser;
