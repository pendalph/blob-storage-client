import { css } from '@emotion/core';

interface Props {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    type: string;
    onChange?: (value: string) => void;
}

const style = css`
    border: solid 1px #b3b3b3;
    padding: 0 14px;
    font-size: 13px;
    border-radius: 0;
    width: 100%;
    box-sizing: border-box;
    color: #333;
    height: 34px;
    transition: border-color ease-in-out 0.2s;

    &:disabled {
        background: #e0e0e0;
        border-color: #d5d5d5;
    }

    &:focus {
        border-color: #000;
        border-radius: 0;
        outline: 0;
    }
`;

const Input: React.FC<Props> = props => (
    <input
        css={style}
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange?.(e.target.value)}
    />
);

export default Input;
