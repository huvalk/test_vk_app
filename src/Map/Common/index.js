function chunk(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

function isTouchEnabled() {
    return ( 'ontouchstart' in window ) ||
        ( navigator.maxTouchPoints > 0 ) ||
        ( navigator.msMaxTouchPoints > 0 );
}

export {chunk, isTouchEnabled};