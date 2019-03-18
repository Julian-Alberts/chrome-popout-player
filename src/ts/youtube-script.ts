///<reference path="VideoElement.ts"/>
namespace youtube {
    let added = false;
    function onModify() {
        let videoElement: VideoElement = new VideoElement(document.querySelector('.video-stream.html5-main-video'));
        let miniPlayerButton = document.querySelector('.ytp-fullscreen-button.ytp-button');
        if (!videoElement.videoElement || !miniPlayerButton || added) {
            return;
        }
        added = true;
        document.body.removeEventListener('DOMSubtreeModified', onModify);
        let popoutButton: HTMLButtonElement = <HTMLButtonElement>document.createElement('button');
        popoutButton.classList.add('ytp-button');
        popoutButton.innerHTML = `<img style="filter: invert(1);" src="${chrome.runtime.getURL('popout-icon.svg')}">`
        miniPlayerButton.parentElement.insertBefore(popoutButton, miniPlayerButton);

        popoutButton.addEventListener('click', () => {
            videoElement.togglePictureInPicture();
        });
    }
    onModify();
    document.body.addEventListener('DOMSubtreeModified', onModify);
}
