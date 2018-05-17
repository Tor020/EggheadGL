<template lang="pug">
div
  canvas(class='' id='canvas' @click='' width='400px'
height='400px')
  input(type="button" value='RunMethod' @click="runMethod" )
</template>


<script>
export default {
  computed: {},

  methods: {
    runMethod() {
      // Start of Run Method
     var gl,
    shaderProgram,
    vertices;

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
  var vs = "";
  vs += "attribute vec4 coords;";
  vs += "attribute float pointSize;";
  vs += "void main(void) {";
  vs += "  gl_Position = coords;";
  vs += "  gl_PointSize = pointSize;";
  vs += "}";
  
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);

  var fs = "";
  fs += "precision mediump float;";
  fs += "uniform vec4 color;";
  fs += "void main(void) {";
  fs += "  gl_FragColor = color;";
  fs += "}";

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [
    //These are three different points that appear
    //x     y    z
    -0.9, -0.9, 0.0,  //  0,0,0 = center as opposed to html canvas where 0,0 = top left
     0.9, -0.9, 0.0,
     0.0,  0.9, 0.0
  ];
  
  var buffer = gl.createBuffer();  // Empty buffer
  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);  
  // binding means that you're setting this buffer as the target of future webgl operations.
  // binding a buffer prevents direct access to the buffer by binding it.
  // there are different types of buffers
  // creates a route to the passed buffer that will be the target of Array_buffer ie: the buffer is bound to the ARRAY_BUFFER
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
  var coords = gl.getAttribLocation(shaderProgram, "coords");
//   gl.vertexAttrib3f(coords, 0.5, 0.5, 0); cannot use since we're using an entire buffer of data
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords); // basically initializes 
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Passing, null to the bindBuffer call closes of the buffer
  
  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 20);
  
  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0, 0, 0, 1);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3); // needs to reflect that there are 3 points being drawn
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



