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
var PingPongFBO = /** @class */ (function (_super) {
    __extends(PingPongFBO, _super);
    function PingPongFBO(shader, sizeX, sizeY) {
        var _this = _super.call(this, shader, sizeX, sizeY) || this;
        _this.resetTextures();
        _this._framebuffer = gl.createFramebuffer();
        return _this;
    }
    PingPongFBO.prototype.render = function () {
        gl.viewport(0, 0, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this._program);
        gl.enableVertexAttribArray(this._positionAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.vertexAttribPointer(this._positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this._texCoordAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.vertexAttribPointer(this._texCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._textures[this._currentTexture], 0);
        this._shader.update();
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.readPixels(0, 0, this.sizeX, this.sizeY, gl.RGBA, gl.FLOAT, this._textureData);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this._currentTexture = 1 - this._currentTexture;
    };
    PingPongFBO.prototype.resetTextures = function () {
        this._textures = [];
        this._textures.push(gl.createTexture());
        gl.bindTexture(gl.TEXTURE_2D, this._textures[0]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, gl.RGBA, gl.FLOAT, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this._textures.push(gl.createTexture());
        gl.bindTexture(gl.TEXTURE_2D, this._textures[1]);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.sizeX * this.scaleFactor, this.sizeY * this.scaleFactor, 0, gl.RGBA, gl.FLOAT, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this._currentTexture = 0;
        this._textureData = new Float32Array(this.sizeX * this.sizeY * 4);
    };
    Object.defineProperty(PingPongFBO.prototype, "texture", {
        get: function () { return this._textures[1 - this._currentTexture]; },
        set: function (input) { this._textures[1 - this._currentTexture] = input; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongFBO.prototype, "lastTexture", {
        get: function () { return this._textures[1 - this._currentTexture]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PingPongFBO.prototype, "textureData", {
        get: function () { return this._textureData; },
        enumerable: true,
        configurable: true
    });
    return PingPongFBO;
}(RenderTarget));
export default PingPongFBO;
//# sourceMappingURL=pingpong-fbo.js.map