<template>
  <div class="flex flex-col sm:flex-row justify-around gap-2">
    <OverviewCard title="Revenue" :value="revenue"/>
    <OverviewCard title="Debts" :value="debts"/>
    <OverviewCard title="Total" :value="total"/>
  </div>
</template>

<script>
import OverviewCard from "./OverviewCard.vue";

export default {
  name: "Overview",

  components: {
    OverviewCard
  },

  props: {
    revenue: {
      default: 0,
      type: Number
    },
    debts: {
      default: 0,
      type: Number
    },
  },

  computed: {
    total() {
      return this.revenue - this.debts;
    }
  }
}
</script>
