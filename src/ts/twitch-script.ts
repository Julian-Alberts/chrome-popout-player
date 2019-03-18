///<reference path="VideoElement.ts"/>
namespace twitch {
    function onModify() {
        let videoElement: VideoElement = new VideoElement(document.querySelector('.player-video > video'));
        if (!videoElement.videoElement || document.querySelector('.popout-btn')) {
            return;
        }
        document.body.removeEventListener('DOMSubtreeModified', onModify);

        let fullScreenButton: HTMLButtonElement = document.querySelector('button.player-button.qa-fullscreen-button');
        let popoutButton: HTMLButtonElement = document.createElement('button');
        popoutButton.innerHTML = `<img style="filter: invert(1);" class="svg-icon" src="${chrome.runtime.getURL('popout-icon.svg')}">`;
        popoutButton.classList.add('player-button', 'popout-btn');

        popoutButton.addEventListener('click', () => {
            videoElement.togglePictureInPicture();
        });

        fullScreenButton.parentElement.insertBefore(popoutButton, fullScreenButton);

        document.body.addEventListener('DOMSubtreeModified', onModify);
    }

    document.body.addEventListener('DOMSubtreeModified', onModify);
}