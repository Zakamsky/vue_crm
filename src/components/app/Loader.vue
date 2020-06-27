<template>
    <div class="app-loader">
      <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-green-only" >
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Loader",
    }
</script>

<style scoped>
  .preloader-wrapper .spinner-layer.spinner-green-only {
    animation: colorChange 3000ms linear infinite, container-rotate 1568ms linear infinite;
  }

  @keyframes colorChange {
    0% {
      border-color: #2bbbad;
    }
    50%{
      border-color: #ff9800;
    }
    100%{
      border-color: #2bbbad;
    }
  }
</style>
