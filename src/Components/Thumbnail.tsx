import React, {FC} from 'react';


export const ViewThumbnail: FC<{ url: string; onDelete: () => void; onImageClick: () => void }> = ({
    url,
    onDelete,
    onImageClick,
}) => {
    return <span className={'image-thumbnail-container'}>
        <button className={'image-thumbnail-delete'} onClick={onDelete}>delete</button>
        <img
            onClick={onImageClick}
            className={'image-thumbnail'}
            src={url}
            alt={'img'}
        />
    </span>;
};