import { gl } from './render-context';
var DataTexture3d = /** @class */ (function () {
    function DataTexture3d(_width, _height, _depth, _data) {
        this._width = _width;
        this._height = _height;
        this._depth = _depth;
        this._data = _data;
        this._texture = gl.createTexture();
        this.updateTexture();
    }
    DataTexture3d.prototype.updateTexture = function () {
        gl.bindTexture(gl.TEXTURE_3D, this._texture);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage3D(gl.TEXTURE_3D, 0, gl.R32F, this._width, this._height, this._depth, 0, gl.RED, gl.FLOAT, this._data);
    };
    Object.defineProperty(DataTexture3d.prototype, "texture", {
        get: function () { return this._texture; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture3d.prototype, "width", {
        get: function () { return this._width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture3d.prototype, "height", {
        get: function () { return this._height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTexture3d.prototype, "textureData", {
        get: function () { return this._data; },
        enumerable: true,
        configurable: true
    });
    return DataTexture3d;
}());
export default DataTexture3d;
//# sourceMappingURL=data-texture-3d.js.map