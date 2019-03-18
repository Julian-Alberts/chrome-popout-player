///<reference path="VideoElement.ts"/>
namespace netflix {
    function onModify() {
        let videoElement: VideoElement = new VideoElement(document.querySelector('.VideoContainer video'));
        let fullScreenButton: HTMLButtonElement = document.querySelector('.touchable.PlayerControls--control-element.nfp-button-control.default-control-button.button-nfplayerFullscreen');
        if (!videoElement.videoElement || !fullScreenButton || document.querySelector('.popout-btn')) {
            return;
        }
        document.body.removeEventListener('DOMSubtreeModified', onModify);
        let popoutButton: HTMLButtonElement = document.createElement('button');
        popoutButton.innerHTML = `<img style="filter: invert(1);" class="svg-icon" src="${chrome.runtime.getURL('popout-icon.svg')}">`;
        popoutButton.classList.add('touchable', 'PlayerControls--control-element', 'nfp-button-control', 'default-control-button', 'popout-btn');
        fullScreenButton.parentElement.insertBefore(popoutButton, fullScreenButton);

        popoutButton.addEventListener('click', () => {
            videoElement.togglePictureInPicture();
        });
        document.body.addEventListener('DOMSubtreeModified', onModify);
    }

    document.body.addEventListener('DOMSubtreeModified', onModify);
}

interface HTMLElement {
    append(el: Node): void;
}