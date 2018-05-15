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
      var gl, shaderProgram;

      initGL();
      createShaders();
      draw();

      function initGL() {
        var canvas = document.getElementById('canvas');
        console.log(canvas);
        gl = canvas.getContext('webgl'); //gl only refers to the canvas that is using the context of webgl
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
      }

      function createShaders() {
        //a vertex shader that will define how the vertices translated, scales, or otherwise transformed, 
        var vs = '';
        vs += 'void main(void) {';
        vs += '  gl_Position = vec4(0.5, 0.5, 0.0, 1.0);';
        vs += '  gl_PointSize = 100.0;';
        vs += '}';


        // Ѽ-Ѽ Recurring pattern in web GL, don't manipulate the object directly, but pass it to a WebGL method 
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vs);
        gl.compileShader(vertexShader);

        var fs = '';
        //ᛥ a fragment shader that will determine the color of the pixels drawn by those vertices.
        fs += 'void main(void) {';
        fs += '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);';
        fs += '}';
        //ᛥ gl_FragColor represent the colors that the fragment will get. fragcolor correspond to RGBA 

        // Ѽ-Ѽ Recurring pattern in web GL, don't manipulate the object directly, but pass it to a WebGL method - same pattern as above
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fs);
        gl.compileShader(fragmentShader);


        shaderProgram = gl.createProgram();

        // attaching a shader to a shader program is done with this method 

        // `attachShader(programShadersAreAttached, ShaderBeingAttached)`
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Links the shaders to the webGL canvas context
        gl.linkProgram(shaderProgram); 
        // Instructs the canvas to use the linked shaderprogram
        gl.useProgram(shaderProgram);
      }

      function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1);
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



