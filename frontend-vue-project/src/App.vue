
<template>
  <div id="app">
   <div class="main-container">
 <RouterView />
</div>
</div>
</template>

<script lang="ts">
// import { RouterView } from 'vue-router'
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    
  },
});
</script>

<style scoped>
.app{
  height: 100vh;
}
.main-container {
  background-color: white;
  padding: 0cm;
  align-items: center;
  border: 2px solid grey;
  width: 80vw;
  height: 95vh;
}

</style>