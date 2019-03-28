var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import RenderTarget from './render-target';
import { gl } from './render-context';
var FBO = /** @class */ (function (_super) {
    __extends(FBO, _super);
    function FBO(shader, sizeX, sizeY, _outputChannels) {
        var _this = _super.call(this, shader, sizeX, sizeY) || this;
        _this._outputChannels = _outputChannels;
        _this._writeToTexture = false;
        _this.resetTexture();
        _this._framebuffer = gl.createFramebuffer();
        return _this;
    }
    FBO.prototype.render = function () {
        gl.viewport(0, 0, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this._program);
        // gl.colorMask(true, false, false, false)
        gl.enableVertexAttribArray(this._positionAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.vertexAttribPointer(this._positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this._texCoordAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.vertexAttribPointer(this._texCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0);
        this._shader.update();
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (this._writeToTexture) {
            gl.readPixels(0, 0, this.sizeX, this.sizeY, gl.RGBA, gl.FLOAT, this._textureData);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    };
    FBO.prototype.resetTexture = function () {
        var internalFormat = gl.RGBA32F;
        var type = gl.RGBA;
        var channels = 4;
        if (this._outputChannels) {
            switch (this._outputChannels) {
                case 1:
                    internalFormat = gl.R32F;
                    type = gl.RED;
                    channels = 1;
                    break;
                default:
                    break;
            }
        }
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.sizeX, this.sizeY, 0, type, gl.FLOAT, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this._textureData = new Float32Array(this.sizeX * this.sizeY * channels);
    };
    FBO.prototype.resize = function (sizeX, sizeY) {
        this.setWindowSize(sizeX, sizeY);
        this.resetTexture();
    };
    FBO.prototype.enableWriteToTexture = function () {
        this._writeToTexture = true;
    };
    Object.defineProperty(FBO.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FBO.prototype, "textureData", {
        get: function () { return this._textureData; },
        enumerable: true,
        configurable: true
    });
    return FBO;
}(RenderTarget));
export default FBO;
//# sourceMappingURL=fbo.js.map