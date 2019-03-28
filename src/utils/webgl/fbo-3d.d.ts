import Shader from './shader';
import RenderTarget from './render-target';
export default class FBO3d extends RenderTarget {
    private _texture;
    private _textureData;
    private _writeToTexture;
    private _framebuffer;
    constructor(shader: Shader, sizeX: number, sizeY: number, sizeZ: number);
    render(): void;
    resetTexture(): void;
    resize(sizeX: number, sizeY: number): void;
    enableWriteToTexture(): void;
    readonly texture: WebGLTexture;
    readonly textureData: Float32Array;
}
