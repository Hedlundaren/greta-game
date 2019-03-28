import { gl } from './render-context';
var DataTexture = /** @class */ (function () {
    function DataTexture(_width, _height, _data, _channels) {
        this._width = _width;
        this._height = _height;
        this._data = _data;
        this._channels = _channels;
        this._texture = gl.createTexture();
        this.updateTexture();
    }
    DataTexture.prototype.updateTexture = function () {
        var internalFormat = gl.RGBA32F;
        var type = gl.RGBA;
        switch (this._channels) {
            case 1:
                internalFormat = gl.R32F;
                type = gl.RED;
                break;
            default: break;
        }
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this._width, this._height, 0, type, gl.FLOAT, this._data);
    };
    Object.defineProperty(DataTexture.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture.prototype, "textureData", {
        get: function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    return DataTexture;
}());
export default DataTexture;
//# sourceMappingURL=data-texture.js.map