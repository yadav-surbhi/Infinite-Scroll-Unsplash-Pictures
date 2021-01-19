const imageContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let photosArray= [];

// Unsplash API
const count= 30;
const apiKey= '4_T4Rfb5wl0yubnUjZ4me4XhiAqX90bYahsJbKd-SmI';
const apiURL= `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let ready= false;
let imageLoaded= 0;
let totalImages= 0;

//Check if all images were loaded
function imageLoader(){
    imageLoaded++;
    if(imageLoaded === totalImages){
        ready= true;
        loader.hidden= true;
    }
}

//Helper function for setAttribute
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for Links & Photos, Add to DOM
function displayPhotos(){
    imageLoaded= 0;
    totalImages= photosArray.length;
    //Run function for each object in PhotosArray
    photosArray.forEach((photo) => {
        //Create <a> element to link to Unsplash API
        const item= document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> element to display all the photos
        const img= document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, to check when each is finished loading
        img.addEventListener('load', imageLoader);

        //To put <img> element inside <a> and put all inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unspash API
async function getPhotos(){
    try{
        const response= await fetch(apiURL);
    photosArray= await response.json();
    displayPhotos();
    }
    catch{
        console.log("Some error with the getPhotos function.");
    }
}

//scroll functionality
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready= false;
        getPhotos();   
   }
});

// on load
getPhotos();