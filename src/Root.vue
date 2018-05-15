<template>
  <div id="app">
    <div id="nav">
      <div class="content">
      <router-link to="/">Home</router-link> |
      <router-link to="/MainArea">Main Array Tests</router-link>
    </div>
  </div>

    
    <router-view/>
  </div>


</template>

<style lang="scss">


#nav{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
</style>
