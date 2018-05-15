<template lang="pug">
div
  canvas(class='' id='canvas' width='600px' height='600px' @click='')
  input(type="button" value='RunMethod' @click="runMethod")
</template>


<script>


export default {


  computed: {},

  methods: {
  runMethod() {
          // Start of Run Method        


  var gl;

  initGL();
  draw();

  function initGL() {
    var canvas = document.getElementById("canvas");
    console.log(canvas);
    gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1);
  }

  function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
  }



 

          // End of Run Method
      },
  },

  mounted() {
        console.log(this.runMethod(),  "outputs Undefined if nothing was returned from runMethod() ");



      },
}

</script>
<style lang="sass">
</style>



