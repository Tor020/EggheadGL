<template lang="pug">
div
  canvas#canvas(width='600', height='600')
  //- script(type='text/javascript', src='https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.3.2/gl-matrix-min.js') included in the public index
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

export default {
  computed: {},

  methods: {
    runMethod() {
      // Start of Run Method
var gl,
    shaderProgram,
    vertices,
    matrix = mat4.create(),
    vertexCount = 30; // creates 10 triangles because 3 points for triangle * 10

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
  vertices = [];
  for(var i = 0; i < vertexCount; i++) {
    vertices.push(Math.random() * 2 - 1);
    vertices.push(Math.random() * 2 - 1);
    vertices.push(Math.random() * 2 - 1);
  }
    
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
  mat4.rotateX(matrix, matrix, -0.007);
  mat4.rotateY(matrix, matrix, 0.013);
  mat4.rotateZ(matrix, matrix, 0.01);
  //              |        |    |
  //   Matrix to receive   |    |
  //               source matrix|
  //                           new angle 
  
  
  var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
  gl.uniformMatrix4fv(transformMatrix, false, matrix);
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
  requestAnimationFrame(draw);
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



