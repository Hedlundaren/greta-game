export var gl;
export var initRenderContext = function (canvas) {
    if (gl == null) {
        gl = canvas.getContext('webgl2', { alpha: true, antialias: true, preserveDrawingBuffer: true });
        if (gl === null) {
            console.log('WebGL2 not available');
            return;
        }
        gl.getExtension('EXT_color_buffer_float');
        gl.getExtension('OES_texture_float_linear');
        gl.getExtension('OES_standard_derivatives');
        gl.getExtension('EXT_shader_texture_lod');
    }
};
//# sourceMappingURL=render-context.js.map