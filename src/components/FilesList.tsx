import { css } from '@emotion/core';
import File from './File';
import { FileType } from '../types';

interface Props {
    files: FileType[];
    handleDeselect: () => void;
    selectedFile: FileType | null;
    onSelect: (value: FileType) => void;
}

const style = css`
    flex: 1;
    border: solid 2px #ccc;
    padding: 10px;
`;

const FilesList: React.FC<Props> = props => {
    return (
        <div css={style} onClick={props.handleDeselect}>
            {props.files.map(file => (
                <File
                    key={file.name}
                    name={file.name}
                    selected={file.name === props.selectedFile?.name}
                    onClick={() => props.onSelect(file)}
                />
            ))}
        </div>
    );
};

export default FilesList;
