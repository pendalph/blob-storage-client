import { FileType } from '../types';
import { css } from '@emotion/core';

interface Props {
    file: FileType;
}

const style = css`
    margin: 0 0 15px;

    dt {
        font-weight: bold;
    }

    dd {
        margin: 0 0 15px 0;
    }
`;

const FileInfo: React.FC<Props> = props => (
    <dl css={style}>
        <dt>File name</dt>
        <dd>{props.file.name}</dd>

        <dt>Date created</dt>
        <dd>{props.file.creationTime}</dd>

        <dt>Date modified</dt>
        <dd>{props.file.lastModified}</dd>

        <dt>Size</dt>
        <dd>{props.file.contentLength} byte(s)</dd>
    </dl>
);

export default FileInfo;
