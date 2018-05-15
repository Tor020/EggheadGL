Web GL Notes

##Lesson 2
Web GL Concepts

vertices - points in a 3d space
shaders -  define how those points are interepretted and rendered on the screen

shader is actually a small program written in a C like language called `GLSL` or `openGlShaderLanguage`
You write shaders as strings and then use javascript to compile those strings into function shader code


We're going to need to make two shaders, 
- a vertex shader that will define how the vertices translated, scales, or otherwise transformed, 
- a fragment shader that will determine the color of the pixels drawnbythose vertices.


[4:47-4:48 -- gl.useProgram](https://egghead.io/lessons/webgl-introduction-to-webgl-shaders)