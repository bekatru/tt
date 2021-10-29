import React, {useEffect, useState} from 'react';
//Constants
import {
    numberOfColumns,
    numberOfItemsFitting,
    thumbnailSize,
} from './Constants';
//Types
import {Image} from './Types';
//Api
import {getImages} from './API';
//Styles
import './App.css';
import {MoreButton} from './Components/MoreButton';
import {ViewThumbnail} from './Components/Thumbnail';
import {TopBar} from './Components/TopBar';
import {Modal} from './Components/Modal';
import {Selector} from './Components/Selector';


function App() {
    //Constants
    const paginationStep = numberOfItemsFitting;
    //State
    const [images, setImages] = useState<Image[]>([]);
    const [paginationLimit, setPaginationLimit] = useState<number>(paginationStep);
    const [zoomedImageIndex, setZoomedImageIndex] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | undefined>(undefined);

    //Effects
    useEffect(() => {

        getImages()
            .then((images) => images && setImages(images))
            .catch((error) => console.log('Error fetching images', error));

    }, []);


    //Methods
    function increasePaginationLimit(): void {
        setPaginationLimit(paginationLimit + paginationStep);
    }


    function filterImages(data: Image[]): typeof data {
        return data
            .filter(({albumId}) => selectedAlbumId === albumId || !selectedAlbumId)
            .slice(0, paginationLimit);
    }


    function deleteImage(id: number): void {
        const filteredImages = images.filter((image) => image.id !== id);
        setImages(filteredImages);
    }


    function handleThumbnailClick(index: number) {
        setZoomedImageIndex(index);
        setIsModalVisible(true);
    }


    function getListOfAlbumIds(): number[] {
        return images
            .reduce<number[]>(
                (res, {albumId}) => res.includes(albumId) ? res : [...res, albumId],
                [],
            );
    }


    function handleSelectChange(id: number): void {
        setSelectedAlbumId(isNaN(id) ? undefined : id);
    }


    return (
        <div
            className="App"
            style={{width: numberOfColumns * thumbnailSize}}
        >
            {filterImages(images).map((img, i) =>
                <ViewThumbnail
                    key={i}
                    url={img.thumbnailUrl}
                    onImageClick={() => handleThumbnailClick(i)}
                    onDelete={() => deleteImage(img.id)}
                />,
            )}
            <MoreButton onClick={increasePaginationLimit}>more</MoreButton>
            <TopBar>
                Album:
                <Selector options={getListOfAlbumIds()} onChange={handleSelectChange}/>
            </TopBar>
            <Modal
                onClickAway={() => setIsModalVisible(false)}
                visible={isModalVisible}
            >
                <img src={images[zoomedImageIndex]?.url || ''} alt={'img'}/>
                {images[zoomedImageIndex]?.title}
            </Modal>
        </div>
    );
}


export default App;
