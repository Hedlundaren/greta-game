export interface IUniform {
    value: any;
    type: number;
    location?: WebGLUniformLocation;
}
export interface IUniforms {
    [name: string]: IUniform;
}
export declare enum UniformTypes {
    Float = 0,
    Integer = 1,
    Vec2 = 2,
    Vec3 = 3,
    Vec4 = 4,
    Texture2d = 5,
    Texture3d = 6
}
export default class Shader {
    needsUpdate: boolean;
    private _vertexShader;
    private _fragmentShader;
    private _program;
    private _uniforms;
    constructor(vertexSource: string, fragmentSource: string);
    update(): void;
    setUniform(id: string, data: IUniform): void;
    private createShader;
    private setActiveTexture;
    private updateUniforms;
    uniforms: {
        [p: string]: IUniform;
    };
    program: WebGLProgram;
    readonly fragmentShader: WebGLShader;
    readonly vertexShader: WebGLShader;
}
