let imgs = document.querySelectorAll('img');
let video = document.querySelector('video');
let videoSrc = document.querySelector('source');
let dlBttn = document.getElementById('dl');

video.style.visibility = 'hidden';
dlBttn.style.visibility = 'hidden';

async function getMedia() {
    //Define locals
    let media;
    let tweet = document.getElementById('tweetLink').value;
    let imgColumns = Array.from(document.getElementsByClassName('imgCol'));

    //Reset sources and hide inactive
    videoSrc.src = "";
    video.style.visibility = 'hidden';
    dlBttn.style.visibility = 'hidden';
    imgs.forEach((e) => e.src = "");
    imgColumns.forEach((e) => e.classList.remove('column'))

    //Clean link and call FXTwitter API
    tweet = tweet.slice(0, 8) + 'api.fx' + tweet.slice(8);
    media = await fetch(tweet);
    media = await media.json();
    media = media.tweet.media;

    //Check response
    if (media === undefined) {
        return;
    };

    //video code
    //REFACTOR to work with mixed-media posts
    if (media.videos !== undefined) {
        let mediaVideo = media.videos[0].url;
        videoSrc.src = mediaVideo;
        video.load();
        video.style.visibility = 'visible';
        dlBttn.style.visibility = 'visible';
        return;
    };


    if (media.photos !== undefined) {
        let mediaPhotos = media.photos;
        //BETTER IDEA: array of imgs, foreach through media w/ imgs so no switch
        for (let i = 0; i < mediaPhotos.length; i++) {
            imgs[i].src = mediaPhotos[i].url;
            imgColumns[i].classList.add('column');
        }
    }

}

let downloadVid = () => {
    debugger;
    if (videoSrc.src !== ""){
        window.open(videoSrc.src);
    }
}

//bind button
document.querySelector('button').addEventListener("click", getMedia);
document.getElementById('dl').addEventListener('click', downloadVid);