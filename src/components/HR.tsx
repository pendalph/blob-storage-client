import { css } from '@emotion/core';

const style = css`
    margin: 15px 0;
    border: 0;
    height: 2px;
    background: #d3d3d3;
`;

const HR: React.FC = () => <hr css={style} />;

export default HR;
