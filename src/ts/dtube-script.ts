///<reference path="VideoElement.ts"/>
namespace dtube {

    function onModify() {
        let videoElement: VideoElement = new VideoElement(document.querySelector('video'));
        let fullScreenButton: HTMLButtonElement = document.querySelector('.vjs-fullscreen-control.vjs-control.vjs-button');
        if (videoElement.videoElement && fullScreenButton) {
            document.body.removeEventListener('DOMSubtreeModified', onModify);
            let popoutButton: HTMLButtonElement = document.createElement('button');
            popoutButton.innerHTML = `<img style="filter: invert(1);" class="svg-icon" src="${chrome.runtime.getURL('popout-icon.svg')}">`;
            popoutButton.classList.add('vjs-control', 'vjs-button', 'popout-btn');

            popoutButton.addEventListener('click', () => {
                videoElement.togglePictureInPicture();
            });

            fullScreenButton.parentElement.insertBefore(popoutButton, fullScreenButton);
        }
    }

    document.body.addEventListener('DOMSubtreeModified', onModify);
}
