Web GL Notes
## General Assistance
[commented boilerplate goes over the binding and compiling of shaders referenced in every webgl ](https://webglfundamentals.org/webgl/lessons/webgl-boilerplate.html)

## Lesson 2

<!--
██╗     ███████╗███████╗███████╗ ██████╗ ███╗   ██╗    ██████╗               ██████╗  █████╗ ███████╗██╗ ██████╗    ██╗███╗   ██╗███████╗ ██████╗
██║     ██╔════╝██╔════╝██╔════╝██╔═══██╗████╗  ██║    ╚════██╗              ██╔══██╗██╔══██╗██╔════╝██║██╔════╝    ██║████╗  ██║██╔════╝██╔═══██╗
██║     █████╗  ███████╗███████╗██║   ██║██╔██╗ ██║     █████╔╝    █████╗    ██████╔╝███████║███████╗██║██║         ██║██╔██╗ ██║█████╗  ██║   ██║
██║     ██╔══╝  ╚════██║╚════██║██║   ██║██║╚██╗██║    ██╔═══╝     ╚════╝    ██╔══██╗██╔══██║╚════██║██║██║         ██║██║╚██╗██║██╔══╝  ██║   ██║
███████╗███████╗███████║███████║╚██████╔╝██║ ╚████║    ███████╗              ██████╔╝██║  ██║███████║██║╚██████╗    ██║██║ ╚████║██║     ╚██████╔╝
╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝              ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝

-->


Web GL Concepts

vertices - points in a 3d space
shaders -  define how those points are interepretted and rendered on the screen

shader is actually a small program written in a C like language called `GLSL` or `openGlShaderLanguage`
You write shaders as strings and then use javascript to compile those strings into function shader code


We're going to need to make two shaders, 
- a vertex shader that will define how the vertices translated, scales, or otherwise transformed, 
- a fragment shader that will determine the color of the pixels drawnbythose vertices.



## Lesson 4 Buffers

<!--
██╗     ███████╗███████╗███████╗ ██████╗ ███╗   ██╗    ██╗  ██╗    ██████╗ ██╗   ██╗███████╗███████╗███████╗██████╗ ███████╗       ██████╗ ██╗███╗   ██╗██████╗ ██╗███╗   ██╗ ██████╗        ████████╗ █████╗ ██████╗  ██████╗ ███████╗████████╗███████╗
██║     ██╔════╝██╔════╝██╔════╝██╔═══██╗████╗  ██║    ██║  ██║    ██╔══██╗██║   ██║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝       ██╔══██╗██║████╗  ██║██╔══██╗██║████╗  ██║██╔════╝        ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝ ██╔════╝╚══██╔══╝██╔════╝
██║     █████╗  ███████╗███████╗██║   ██║██╔██╗ ██║    ███████║    ██████╔╝██║   ██║█████╗  █████╗  █████╗  ██████╔╝███████╗       ██████╔╝██║██╔██╗ ██║██║  ██║██║██╔██╗ ██║██║  ███╗          ██║   ███████║██████╔╝██║  ███╗█████╗     ██║   ███████╗
██║     ██╔══╝  ╚════██║╚════██║██║   ██║██║╚██╗██║    ╚════██║    ██╔══██╗██║   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗╚════██║       ██╔══██╗██║██║╚██╗██║██║  ██║██║██║╚██╗██║██║   ██║          ██║   ██╔══██║██╔══██╗██║   ██║██╔══╝     ██║   ╚════██║
███████╗███████╗███████║███████║╚██████╔╝██║ ╚████║         ██║    ██████╔╝╚██████╔╝██║     ██║     ███████╗██║  ██║███████║▄█╗    ██████╔╝██║██║ ╚████║██████╔╝██║██║ ╚████║╚██████╔╝▄█╗       ██║   ██║  ██║██║  ██║╚██████╔╝███████╗   ██║   ███████║
╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝         ╚═╝    ╚═════╝  ╚═════╝ ╚═╝     ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝    ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝

-->
```
function createVertices() {
  vertices = [
    //These are three different points that appear
    //x     y    z
    -0.9, -0.9, 0.0,  //  0,0,0 = center as opposed to html canvas where 0,0 = top left
     0.9, -0.9, 0.0,
     0.0,  0.9, 0.0
  ];

  Because this is a javascript array in its current form, it needs to be converted into a data format javascript can use.
  So a special web gl datastructure called a buffer is used
  This is called a vertex buffer
```

  
  ```
  var buffer = gl.createBuffer();  // Creates an Empty Buffer
  ```
  
  ```
     method        type of buffer, target
        |              |           |
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // binding a buffer as a target 
  // there are different types of buffers
  // binding means that you're setting this buffer as the target of future webgl operations.
  // creates a route to the passed buffer that will be the target of Array_buffer ie:
   the 2nd argument passed to bindBuffer bound to the ARRAY_BUFFER in this case
  ```  

```                                    
                                                      Indicates How we intend to use the data to webgl
                                Special Data Structure              |
          Indicates the target            |                         |
                    |                     |                         |
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // 

```


```
  
   ─── OLD WAY Single Point ────────────────────────────────────────────────────────────────────
  
  var coords = gl.getAttribLocation(shaderProgram, "coords");
/*   gl.vertexAttrib3f(coords, 0.5, 0.5, 0); */
            |
// This was the old way of passing a single point to the AttribLocation
// not viable because it only uses a single point, and we're using a buffer full of data now.
```

```
  
   ─── NEW WAY Multi Point────────────────────────────────────────────────────────────────────
                            

                                  Points Passed in each
              Attribute location  |
                            |     |
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
                                |                         |
                                |                         |
                                |_________________________|
                                            |
                                        Info about Buffer contents

  gl.enableVertexAttribArray(coords); // basically initializes 
  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Passing, null to the bindBuffer call closes of the buffer

```
```

```


[4:47-4:48 -- gl.useProgram](https://egghead.io/lessons/webgl-introduction-to-webgl-shaders)


<!--
██╗    ██╗███████╗██████╗  ██████╗ ██╗         ███████╗██╗   ██╗███╗   ██╗██████╗  █████╗ ███╗   ███╗███████╗███╗   ██╗████████╗ █████╗ ██╗     ███████╗    ██╗     ██╗███╗   ██╗██╗  ██╗
██║    ██║██╔════╝██╔══██╗██╔════╝ ██║         ██╔════╝██║   ██║████╗  ██║██╔══██╗██╔══██╗████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██║     ██╔════╝    ██║     ██║████╗  ██║██║ ██╔╝
██║ █╗ ██║█████╗  ██████╔╝██║  ███╗██║         █████╗  ██║   ██║██╔██╗ ██║██║  ██║███████║██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ███████║██║     ███████╗    ██║     ██║██╔██╗ ██║█████╔╝
██║███╗██║██╔══╝  ██╔══██╗██║   ██║██║         ██╔══╝  ██║   ██║██║╚██╗██║██║  ██║██╔══██║██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ██╔══██║██║     ╚════██║    ██║     ██║██║╚██╗██║██╔═██╗
╚███╔███╔╝███████╗██████╔╝╚██████╔╝███████╗    ██║     ╚██████╔╝██║ ╚████║██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ██║  ██║███████╗███████║    ███████╗██║██║ ╚████║██║  ██╗
 ╚══╝╚══╝ ╚══════╝╚═════╝  ╚═════╝ ╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝


[Web GL 1](https://webglfundamentals.org/)


-->


<!-- https://www.npmjs.com/package/vue-unity-webgl -->