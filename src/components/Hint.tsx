import { css } from '@emotion/core';

const style = css`
    font-size: 14px;
    color: #444;
    margin: 0 0 15px;
`;

const Hint: React.FC = props => <p css={style}>{props.children}</p>;

export default Hint;
