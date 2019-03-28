import PingPongFBO from './pingpong-fbo';
import Shader from './shader';
var PingPongComputeShader = /** @class */ (function () {
    function PingPongComputeShader(computeShaderSource, _sizeX, _sizeY, _channels) {
        this._sizeX = _sizeX;
        this._sizeY = _sizeY;
        this._channels = _channels;
        this._shader = new Shader(computeVertexSource, computeShaderSource);
        this._fbo = new PingPongFBO(this._shader, this._sizeX, this._sizeY); // this._channels ? this._channels : 4)
    }
    PingPongComputeShader.prototype.compute = function () {
        this._fbo.render();
        return this._fbo.texture;
    };
    PingPongComputeShader.prototype.setUniform = function (id, data) {
        this._shader.setUniform(id, data);
    };
    PingPongComputeShader.prototype.update = function () {
        this._shader.update();
    };
    Object.defineProperty(PingPongComputeShader.prototype, "uniforms", {
        set: function (value) { this._shader.uniforms = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongComputeShader.prototype, "sizeX", {
        get: function () { return this._sizeX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongComputeShader.prototype, "sizeY", {
        get: function () { return this._sizeY; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongComputeShader.prototype, "result", {
        get: function () { return this._fbo.textureData; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongComputeShader.prototype, "texture", {
        get: function () { return this._fbo.texture; },
        enumerable: true,
        configurable: true
    });
    return PingPongComputeShader;
}());
export default PingPongComputeShader;
// language=GLSL
export var computeVertexSource = "#version 300 es\n  precision highp float;\n\n  in vec2 a_texCoord;\n  in vec4 a_position;\n  \n  out vec2 v_texCoord;\n  \n  void main() {\n    gl_Position = a_position;\n    v_texCoord = a_texCoord;\n  }\n";
//# sourceMappingURL=pingpong-compute-shader.js.map