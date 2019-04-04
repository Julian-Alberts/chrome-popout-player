///<reference path="util.spec.ts"/>
class VideoElement {

    private _isPiP: boolean = false;

    public constructor(public videoElement: HTMLVideoElement) {
        if (videoElement) {
            videoElement.addEventListener('leavepictureinpicture', _ => this.onLeavePictureInPicture());
        }
    }

    public async tryOpenPictureInPicture(): Promise<boolean> {
        if (!this._isPiP) {
            try {
                await this.videoElement.requestPictureInPicture()
                this._isPiP = true;
            } catch (e) {
                return false;
            }
            return true;
        }
        return true;
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

    public isPipActive(): boolean {
        return this._isPiP;
    }

}