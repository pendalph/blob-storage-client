import { css } from '@emotion/core';
import classNames from 'classnames';
import { useCallback } from 'react';

const previewFiles = ['png', 'jpg'];

interface Props {
    name: string;
    selected?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const getExtension = (fileName: string) =>
    /.*?\.([a-zA-Z0-9]+)/.exec(fileName)?.[1];

const style = css`
    background: 0;
    border-radius: 0;
    width: 90px;
    height: 90px;
    margin: 10px;
    overflow: hidden;
    padding: 15px 0;
    text-align: center;
    display: inline-block;
    border: dotted 1px transparent;
    cursor: pointer;
    outline: 0;

    &:hover {
        border-color: #ccc;
    }

    &.file_selected {
        border: solid 1px #d3e4ff;
        background: rgba(28, 97, 199, 0.04);
    }

    .file__icon {
        margin-bottom: 6px;
        font-size: 40px;

        img {
            width: 40px;
            height: 40px;
            vertical-align: top;
        }
    }

    .file__title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
`;

const File: React.FC<Props> = props => {
    const { onClick } = props;
    const className = classNames({
        file_selected: props.selected
    });

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (onClick) {
                onClick(e);
            }
        },
        [onClick]
    );

    const extension = getExtension(props.name);
    const showPreview = Boolean(
        extension && -1 !== previewFiles.indexOf(extension)
    );

    return (
        <button css={style} onClick={handleClick} className={className}>
            <div className="file__icon">
                {showPreview ? (
                    <img
                        src={`https://saurer.blob.core.windows.net/default/${props.name}`}
                    />
                ) : (
                    <em
                        className={`fiv-sqo fiv-icon-${getExtension(
                            props.name
                        )}`}
                    />
                )}
            </div>
            <div className="file__title">{props.name}</div>
        </button>
    );
};

export default File;
