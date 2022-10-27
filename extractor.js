let imgs = document.querySelectorAll('img');
let video = document.querySelector('video');
let videoSrc = document.querySelector('source');

video.style.visibility = 'hidden';

async function getMedia() {
    //Define locals
    let media;
    let tweet = document.getElementById('tweetLink').value;
    let imgColumns = Array.from(document.getElementsByClassName('imgCol'));

    //Reset sources and hide inactive
    videoSrc.src = "";
    video.style.visibility = 'hidden';
    imgs.forEach((e) =>  e.src = "");
    imgColumns.forEach((e) => e.classList.remove('column'))

    //Clean link and call FXTwitter API
    tweet = tweet.slice(0, 8) + 'api.fx' + tweet.slice(8);
    media = await fetch(tweet);
    media = await media.json();
    media = media.tweet.media;

    //Check response
    if (media === undefined) {
        //change HTML
        return;
    };

    //only allowed one gif or up to four photos 
    if (media.photos === undefined) {
        //insert video code here
        media = media.videos[0].url;
        // debugger;
        // media = media.slice(await media.search('?'));
        videoSrc.src = media;
        await video.load();
        video.style.visibility = 'visible';
        return;
    };

    media = media.photos;

    //BETTER IDEA: array of imgs, foreach through media w/ imgs so no switch
    for (let i = 0; i < media.length; i++) {
        imgs[i].src = media[i].url;
        imgColumns[i].classList.add('column');
    }

}

//bind button
document.querySelector('button').addEventListener("click", getMedia);