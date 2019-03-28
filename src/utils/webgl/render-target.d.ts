import Shader from './shader';
export default class RenderTarget {
    protected _shader: Shader;
    private _sizeX;
    private _sizeY;
    _program: WebGLProgram;
    protected _positionAttribLocation: number;
    protected _positionBuffer: WebGLBuffer;
    protected _texCoordAttribLocation: number;
    protected _texCoordBuffer: WebGLBuffer;
    private _scaleFactor;
    constructor(_shader: Shader, _sizeX: number, _sizeY: number);
    render(): void;
    setWindowSize(sizeX: number, sizeY: number): void;
    scaleFactor: number;
    readonly sizeX: number;
    readonly sizeY: number;
}
