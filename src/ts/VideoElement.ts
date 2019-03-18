///<reference path="util.spec.ts"/>
class VideoElement {

    private _isPiP: boolean = false;

    public constructor(public videoElement: HTMLVideoElement) {
        if (videoElement) {
            videoElement.addEventListener('leavepictureinpicture', _ => this.onLeavePictureInPicture());
        }
    }

    public tryOpenPictureInPicture() {
        if (!this._isPiP) {
            this.videoElement.requestPictureInPicture().then(() => {
                this._isPiP = true;
            })
        }
    }

    public closePictureInPicture() {
        if (this._isPiP) {
            document.exitPictureInPicture().then(() => {
                this._isPiP = false;
            });
        }
    }

    public togglePictureInPicture() {
        if (this._isPiP) {
            this.closePictureInPicture();
        } else {
            this.tryOpenPictureInPicture();
        }
    }

    public onLeavePictureInPicture() {
        this._isPiP = false;
    }

}