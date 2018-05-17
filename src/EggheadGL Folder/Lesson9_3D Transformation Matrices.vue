<template lang="pug">
div
  canvas#canvas(width='600', height='600')
  input(type="button" value='RunMethod' @click="runMethod")
  script#shader-vs(type='x-shader/x-vertex').
    attribute vec4 coords;
    attribute float pointSize;
    uniform mat4 transformMatrix;
    void main(void) {
    gl_Position = transformMatrix * coords;
    gl_PointSize = pointSize;
    }
  script#shader-fs(type='x-shader/x-fragment').
    precision mediump float;
    uniform vec4 color;
    void main(void) {
    gl_FragColor = color;
    }

</template>


<script>
import { getShaders as getShader } from '../EggheadGL Folder/getShaders.js'
import { Φ as Φ } from '../EggheadGL Folder/getShaders.js'

export default {
  computed: {},

  methods: {
    runMethod() {
      // Start of Run Method
   
var gl,
    shaderProgram,
    vertices,
    angle = 0;

  initGL();
  createShaders();
  createVertices();
  draw();

function initGL() {
  var canvas = document.getElementById("canvas");
  console.log(canvas);
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  var vertexShader = getShader(gl, "shader-vs");
  var fragmentShader = getShader(gl, "shader-fs");
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [
    -0.9, -0.9, 0.0,
     0.9, -0.9, 0.0,
     0.0,  0.9, 0.0
  ];
    
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  var coords = gl.getAttribLocation(shaderProgram, "coords");
//   gl.vertexAttrib3f(coords, 0.5, 0.5, 0);
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 20);
  
  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0, 0, 0, 1);
}

function draw() {

  rotateZ(angle += .005);
  rotateX(angle += .005);
  rotateY(angle += .005);
  //f
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(draw);
}

function rotateY(angle) {
  var cos = Math.cos(angle),
      sin = Math.sin(angle),
      matrix = new Float32Array(
                [cos, 0, sin, 0,
                  0,   1, 0, 0,
               -sin,   0, cos, 0,
                  0,   0, 0, 1]);
  var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false, matrix);
}

function rotateZ(angle) {
  var cos = Math.cos(angle),
      sin = Math.sin(angle),
      matrix = new Float32Array(
                [cos, sin, 0, 0,
               -sin, cos, 0, 0,
                  0,   0, 1, 0,
                  0,   0, 0, 1]);
  var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false, matrix);
}
function rotateX(angle) {
  var cos = Math.cos(angle),
      sin = Math.sin(angle),
      matrix = new Float32Array(
                [ 1,  0,   0,   0,
                  0, cos, -sin, 0,
                  0, sin, -cos, 0,
                  0,  0,   0,   1 ]  );
  var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false, matrix);
}



      // End of Run Method
    }
  },

  mounted() {
    console.log(
      this.runMethod(),
      'outputs Undefined if nothing was returned from runMethod() '
    );
  }
};
</script>
<style lang="sass">
    </style>



