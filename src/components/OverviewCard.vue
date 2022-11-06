<template>
  <div class="w-auto sm:w-1/3 bg-white rounded p-4">
    <div class="font-bold">{{ title }}</div>
    <div class="text-2xl">{{ value.toFixed(2) }}</div>
  </div>
</template>

<script>
export default {
  name: "OverviewCard",

  props: {
    title: String,
    value: Number,
  }
}
</script>
