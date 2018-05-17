<template lang='pug'>
div
  canvas#canvas(@click='', width='800px', height='800px')
  input(type='button', value='RunMethod', @click='runMethod')
  script#shader-vs(type='x-shader/x-vertex').
    attribute vec4 coords;
    attribute float pointSize;
    void main(void) {
    gl_Position = coords;
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
    vertexCount = 100;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
  var canvas = document.getElementById("canvas");
  console.log(canvas);
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0, 0, 0, 1);
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
  }
    
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  
  var coords = gl.getAttribLocation(shaderProgram, "coords");
//   gl.vertexAttrib3f(coords, 0.5, 0.5, 0);
  gl.vertexAttribPointer(coords, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
//   gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 22);
  
  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0, 0, 0, 0.0);
}

function draw() {
  for(var i = 0; i < vertexCount * 2; i += 2) {
    vertices[i] += Math.random() * 0.01 - 0.005;
    vertices[i + 1] += Math.random() * 0.01 - 0.005;
  }
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, vertexCount);
  
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



