import React, {FC} from 'react';


export const TopBar: FC = (props) => {
    return <div className={'top-bar hover-container'}>
        {props.children}
    </div>;
};