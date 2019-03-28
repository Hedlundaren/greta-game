import { IUniform } from './shader';
export default class ComputeShader {
    private _sizeX;
    private _sizeY;
    private _channels?;
    private _shader;
    private _fbo;
    constructor(computeShaderSource: string, _sizeX: number, _sizeY: number, _channels?: number);
    compute(): Float32Array;
    setUniform(id: string, data: IUniform): void;
    uniforms: {
        [p: string]: IUniform;
    };
    readonly sizeX: number;
    readonly sizeY: number;
    readonly result: Float32Array;
    readonly texture: WebGLTexture;
}
export declare const computeVertexSource = "#version 300 es\n  precision highp float;\n\n  in vec2 a_texCoord;\n  in vec4 a_position;\n  \n  out vec2 v_texCoord;\n  \n  void main() {\n    gl_Position = a_position;\n    v_texCoord = a_texCoord;\n  }\n";
