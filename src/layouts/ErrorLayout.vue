<template>
  <div class="flex flex-col justify-center items-center h-screen w-3/5 mx-auto">
    <div class="text-3xl">
      <slot></slot>
    </div>

    <div class="my-12">
      <router-link to="/" class="bg-teal-500 px-4 py-2 rounded text-white">Go home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
}
</script>
