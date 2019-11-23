import { css } from '@emotion/core';

interface Props {
    header?: React.ReactNode;
}

const style = css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr;
    grid-template-areas:
        'header'
        'content';
    margin: 40px;

    .layout__header {
        grid-area: header;
    }

    .layout__content {
        grid-area: content;
    }
`;

const Layout: React.FC<Props> = props => (
    <div css={style}>
        <header className="layout__header">{props.header}</header>
        <div className="layout__content">{props.children}</div>
    </div>
);

export default Layout;
