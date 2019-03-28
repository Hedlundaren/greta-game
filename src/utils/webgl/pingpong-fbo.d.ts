import Shader from './shader';
import RenderTarget from './render-target';
export default class PingPongFBO extends RenderTarget {
    private _textures;
    private _textureData;
    private _currentTexture;
    private _framebuffer;
    constructor(shader: Shader, sizeX: number, sizeY: number);
    render(): void;
    resetTextures(): void;
    texture: WebGLTexture;
    readonly lastTexture: WebGLTexture;
    readonly textureData: Float32Array;
}
