export default class DataTexture {
    private _width;
    private _height;
    private _data;
    private _channels?;
    _texture: WebGLTexture;
    constructor(_width: number, _height: number, _data: Float32Array, _channels?: number);
    updateTexture(): void;
    readonly texture: WebGLTexture;
    readonly width: number;
    readonly height: number;
    readonly textureData: Float32Array;
}
