import {Image} from '../Types';


export async function getImages(): Promise<Image[] | void> {
    const url = 'http://jsonplaceholder.typicode.com/photos';

    const response = await fetch(url);
    const data = await response.json();

    return Array.isArray(data) ? data : [];
}