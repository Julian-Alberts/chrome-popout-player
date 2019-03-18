interface HTMLVideoElement {

    requestPictureInPicture(): Promise<PictureInPictureWindow>;

}

interface PictureInPictureWindow {
    width: number;
    height: number;
    onresize: number;
}

interface Document {
    exitPictureInPicture(): Promise<DOMException>;
}
