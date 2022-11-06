<template>
  <div class="bg-teal-600 py-2 flex flex-col sm:flex-row sm:justify-between w-full gap-3 sm:gap-0">
    <router-link to="/">
      <Logo class="text-white self-center sm:self-auto sm:ml-6" />
    </router-link>
    <div class="flex flex-row gap-2 items-center justify-between sm:justify-center w-full sm:w-auto px-2">
      <Datepicker monthPicker v-model="referenceDate" @update:modelValue="handleDateChange" auto-apply />
      <div>
        <button @click="logout"
          class="bg-teal-500 hover:bg-teal-700 transition px-6 rounded py-2 focus:outline-none text-white">
          <span class="uppercase">Sair</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue';
import Datepicker from "@vuepic/vue-datepicker";
import { parse } from "date-fns";
import { mapActions, mapState } from "pinia";
import { logout } from "../services/auth";
import { useRecordsStore } from "../stores/records";

export default {
  name: "Header",

  emits: ['referenceDateChanged'],

  components: {
    Logo,
    Datepicker
  },

  data() {
    return {
      referenceDate: null,
    };
  },

  mounted() {
    this.referenceDate = this.dateAsObject;
  },

  methods: {
    handleDateChange(value) {
      const { month, year } = value;
      const date = parse(`${year}-${month + 1}-01`, 'yyyy-MM-dd', new Date());

      this.setReferenceDate(date);
      this.$emit('referenceDateChanged');
    },

    async logout() {
      await logout();
      this.$router.push('/login');
    },

    ...mapActions(useRecordsStore, ['setReferenceDate']),
  },

  computed: {
    ...mapState(useRecordsStore, ['dateAsObject']),
  }
}
</script>