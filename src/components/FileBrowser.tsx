import { css } from '@emotion/core';
import File from './File';
import Button from './Button';
import { FileType } from 'types';
import { useState, useCallback } from 'react';
import Hint from './Hint';
import FileInfo from './FileInfo';

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
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

    const handleDeselect = useCallback(() => {
        setSelectedFile(null);
    }, [setSelectedFile]);

    return (
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
                <Button>Upload</Button>
                <div className="file-browser__aside__info">
                    {selectedFile ? (
                        <FileInfo file={selectedFile} />
                    ) : (
                        <Hint>Select file to get details</Hint>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileBrowser;
