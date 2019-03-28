export default class DataTexture3d {
    private _width;
    private _height;
    private _depth;
    private _data;
    _texture: WebGLTexture;
    constructor(_width: number, _height: number, _depth: number, _data: Float32Array);
    updateTexture(): void;
    readonly texture: WebGLTexture;
    readonly width: number;
    readonly height: number;
    readonly textureData: Float32Array;
}
