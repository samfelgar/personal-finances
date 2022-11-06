<template>
  <div>
    <Header @reference-date-changed="retrieveByDate"/>
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-3/4 px-4 sm:px-0 sm:mx-auto pt-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Swal from "sweetalert2";
import { retrieveByReference } from '../services/records';
import { mapActions, mapState } from 'pinia';
import { useRecordsStore } from '../stores/records';

export default {
  name: 'AuthenticatedLayout',

  components: {
    Header,
    Sidebar,
  },

  mounted() {
    this.retrieveByDate();
  },

  methods: {
    async retrieveByDate() {
      const date = this.referenceDate ?? new Date();

      try {
        const response = await retrieveByReference(date);
        this.setRecords(response.data);
      } catch (error) {
        this.errorFeedback('Falha ao buscar os lançamentos');
      }

      this.resetSelectedRecord();
    },

    errorFeedback(message) {
      const safeMessage = message ?? 'Unable to process your request';

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: safeMessage,
      });
    },

    ...mapActions(useRecordsStore, {
      setRecords: 'setRecords',
      resetSelectedRecord: 'resetSelectedRecord',
    })
  },

  computed: {
    ...mapState(useRecordsStore, ['records', 'referenceDate']),
  }
};
</script>