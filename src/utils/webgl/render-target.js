import createProgram from './create-program';
import { gl } from './render-context';
var RenderTarget = /** @class */ (function () {
    function RenderTarget(_shader, _sizeX, _sizeY) {
        this._shader = _shader;
        this._sizeX = _sizeX;
        this._sizeY = _sizeY;
        this._program = createProgram(gl, this._shader);
        this._shader.program = this._program;
        this._scaleFactor = 1.0;
        var positions = new Float32Array([
            -1.0, -1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0,
            1.0, -1.0,
        ]);
        var texCoords = new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
        ]);
        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        this._positionAttribLocation = gl.getAttribLocation(this._program, 'a_position');
        this._texCoordAttribLocation = gl.getAttribLocation(this._program, 'a_texCoord');
        this._positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        this._texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
        gl.viewport(0, 0, this._sizeX, this._sizeY);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    RenderTarget.prototype.render = function () {
        gl.viewport(0, 0, this._sizeX, this._sizeY);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this._program);
        gl.enableVertexAttribArray(this._positionAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._positionBuffer);
        gl.vertexAttribPointer(this._positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this._texCoordAttribLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
        gl.vertexAttribPointer(this._texCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
        this._shader.update();
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    RenderTarget.prototype.setWindowSize = function (sizeX, sizeY) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
    };
    Object.defineProperty(RenderTarget.prototype, "scaleFactor", {
        get: function () { return this._scaleFactor; },
        set: function (value) { this._scaleFactor = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget.prototype, "sizeX", {
        get: function () { return this._sizeX; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTarget.prototype, "sizeY", {
        get: function () { return this._sizeY; },
        enumerable: true,
        configurable: true
    });
    return RenderTarget;
}());
export default RenderTarget;
//# sourceMappingURL=render-target.js.map