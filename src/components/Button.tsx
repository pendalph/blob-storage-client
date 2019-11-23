import { css } from '@emotion/core';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    pending?: boolean;
}

const buttonStyle = css`
    background: #1c61c7;
    padding: 0 15px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: 0;
    outline: 0;
    transition: background 0.2s;
    height: 34px;
    border-radius: 0;
    cursor: pointer;
    border: solid 2px rgba(0, 0, 0, 0);
    position: relative;

    &.button_pending,
    &.button_pending:disabled {
        background: #1c61c7;
        cursor: default;

        .button__preloader {
            display: flex;
        }

        .button__label {
            visibility: hidden;
        }
    }

    .button__preloader {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: none;
        align-items: center;
        justify-content: center;

        svg {
            vertical-align: middle;
        }
    }

    &:hover {
        border-color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
        border-color: #000;
    }

    &:disabled {
        background: #c1c1c1;
        border-color: rgba(0, 0, 0, 0);
        cursor: default;
    }

    &:active {
        background: #1b5bba;
    }
`;

const Button: React.FC<Props> = props => {
    const { pending, ...buttonProps } = props;
    const className = classNames({
        button_pending: pending
    });

    return (
        <button
            {...buttonProps}
            css={buttonStyle}
            className={className}
            disabled={props.disabled || pending}
        >
            <div className="button__preloader">
                <Loader type="Oval" color="#fff" height={20} width={20} />
            </div>
            <div className="button__label">{props.children}</div>
        </button>
    );
};

export default Button;
