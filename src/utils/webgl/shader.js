import { gl } from './render-context';
export var UniformTypes;
(function (UniformTypes) {
    UniformTypes[UniformTypes["Float"] = 0] = "Float";
    UniformTypes[UniformTypes["Integer"] = 1] = "Integer";
    UniformTypes[UniformTypes["Vec2"] = 2] = "Vec2";
    UniformTypes[UniformTypes["Vec3"] = 3] = "Vec3";
    UniformTypes[UniformTypes["Vec4"] = 4] = "Vec4";
    UniformTypes[UniformTypes["Texture2d"] = 5] = "Texture2d";
    UniformTypes[UniformTypes["Texture3d"] = 6] = "Texture3d";
})(UniformTypes || (UniformTypes = {}));
var Shader = /** @class */ (function () {
    function Shader(vertexSource, fragmentSource) {
        this.needsUpdate = false;
        this._vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
        this._fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
        this._uniforms = {};
    }
    Shader.prototype.update = function () {
        var textureCount = 0;
        for (var uniformName in this._uniforms) {
            if (uniformName) {
                var uniform = this._uniforms[uniformName];
                if (uniform) {
                    if (uniform.location != null) {
                        if (uniform.type === UniformTypes.Float) {
                            gl.uniform1f(uniform.location, uniform.value);
                        }
                        else if (uniform.type === UniformTypes.Vec2) {
                            gl.uniform2fv(uniform.location, uniform.value);
                        }
                        else if (uniform.type === UniformTypes.Vec3) {
                            gl.uniform3fv(uniform.location, uniform.value);
                        }
                        else if (uniform.type === UniformTypes.Integer) {
                            gl.uniform1i(uniform.location, uniform.value);
                        }
                        else if (uniform.type === UniformTypes.Texture2d || uniform.type === UniformTypes.Texture3d) {
                            gl.uniform1i(uniform.location, textureCount);
                            this.setActiveTexture(textureCount);
                            if (uniform.type === UniformTypes.Texture2d) {
                                gl.bindTexture(gl.TEXTURE_2D, uniform.value);
                            }
                            else if (uniform.type === UniformTypes.Texture3d) {
                                gl.bindTexture(gl.TEXTURE_3D, uniform.value);
                            }
                            textureCount++;
                        }
                    }
                }
            }
        }
    };
    Shader.prototype.setUniform = function (id, data) {
        this._uniforms[id] = data;
        this.updateUniforms();
        this.needsUpdate = true;
    };
    Shader.prototype.createShader = function (type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
        }
        return shader;
    };
    Shader.prototype.setActiveTexture = function (textureCount) {
        if (textureCount === 0) {
            gl.activeTexture(gl.TEXTURE0);
        }
        else if (textureCount === 1) {
            gl.activeTexture(gl.TEXTURE1);
        }
        else if (textureCount === 2) {
            gl.activeTexture(gl.TEXTURE2);
        }
        else if (textureCount === 3) {
            gl.activeTexture(gl.TEXTURE3);
        }
        else if (textureCount === 4) {
            gl.activeTexture(gl.TEXTURE4);
        }
        else if (textureCount === 5) {
            gl.activeTexture(gl.TEXTURE5);
        }
        else if (textureCount === 6) {
            gl.activeTexture(gl.TEXTURE6);
        }
        else if (textureCount === 7) {
            gl.activeTexture(gl.TEXTURE7);
        }
        else if (textureCount === 8) {
            gl.activeTexture(gl.TEXTURE8);
        }
        else if (textureCount === 9) {
            gl.activeTexture(gl.TEXTURE9);
        }
        else if (textureCount === 10) {
            gl.activeTexture(gl.TEXTURE10);
        }
    };
    Shader.prototype.updateUniforms = function () {
        if (this._program) {
            for (var name_1 in this._uniforms) {
                if (name_1) {
                    var uniform = this._uniforms[name_1];
                    uniform.location = gl.getUniformLocation(this._program, name_1);
                }
            }
        }
    };
    Object.defineProperty(Shader.prototype, "uniforms", {
        get: function () { return this._uniforms; },
        set: function (value) {
            this._uniforms = value;
            this.updateUniforms();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "program", {
        set: function (value) {
            this._program = value;
            this.updateUniforms();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "fragmentShader", {
        get: function () { return this._fragmentShader; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "vertexShader", {
        get: function () { return this._vertexShader; },
        enumerable: true,
        configurable: true
    });
    return Shader;
}());
export default Shader;
//# sourceMappingURL=shader.js.map