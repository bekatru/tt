import React, {FC} from 'react';

export const MoreButton: FC<{onClick: () => void}> = (props) => {
    return <button
        className={'more-button hover-container'}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}