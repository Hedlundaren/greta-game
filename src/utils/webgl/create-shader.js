import { gl } from './render-context';
var createShader = function (type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    return shader;
};
export default createShader;
//# sourceMappingURL=create-shader.js.map