import React, {FC} from 'react';


export const Modal: FC<{visible: boolean; onClickAway: () => void}> = ({visible, onClickAway, children}) => {
    const className = visible ? "modal visible" : "modal hidden";
    return <div onClick={onClickAway} className={className}>
        {children}
    </div>
}