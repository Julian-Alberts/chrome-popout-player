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

        popoutButton.addEventListener('click', async () => {
            if (videoElement.isPipActive()) {
                videoElement.closePictureInPicture();
            } else {
                let success = await videoElement.tryOpenPictureInPicture();
                if (!success) {
                    showError('Can not open picture in picture mode. This stream is offline.');
                }
            }
        });

        fullScreenButton.parentElement.insertBefore(popoutButton, fullScreenButton);

        document.body.addEventListener('DOMSubtreeModified', onModify);
    }

    let errorRemoveTimeout: number = null;
    function showError(msg: string, isHTML = false) {
        let container = document.createElement('div');
        container.classList.add('pl-menu', 'popout-player--error');
        container.style.color = 'white';
        container.style.padding = '10px';

        if (isHTML) {
            container.innerHTML = msg;
        } else {
            container.innerText = msg;
        }

        if (errorRemoveTimeout !== null) {
            clearTimeout(errorRemoveTimeout);
            let elem = document.querySelector('.player-buttons-right .pl-flex .popout-player--error');
            elem.remove();
        }

        document.querySelector('.player-buttons-right .pl-flex').appendChild(container);

        errorRemoveTimeout = setTimeout(() => {
            container.remove();
            errorRemoveTimeout = null;
        }, 2500);

    }

    document.body.addEventListener('DOMSubtreeModified', onModify);
}