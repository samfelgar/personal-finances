<template>
  <AuthenticatedLayout>
    <Overview :debts="debts" :revenue="revenue" />
    <Form :add-record-function="addRecord" :edit-record-function="editRecord" :selected-record="selectedRecord"
      @cancel-edit-requested="resetSelectedRecord" />
    <DataTable :delete-record="removeRecord" :edit-record="togglePaidInformation" :select-record="selectRecord" />
  </AuthenticatedLayout>
</template>

<script>
import Overview from "../components/Overview.vue";
import Header from "../components/Header.vue";
import Form from "../components/Form.vue";
import DataTable from "../components/DataTable.vue";
import { deleteRecord, editRecord, storeRecord, updatePaidInformation } from "../services/records";
import { useRecordsStore } from "../stores/records";
import { mapActions, mapState } from "pinia";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar.vue";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";

export default {
  name: 'Home',

  components: {
    Sidebar,
    DataTable,
    Form,
    Header,
    Overview,
    AuthenticatedLayout,
  },

  methods: {
    async addRecord(record) {
      if (!record.reference) {
        record.reference = this.referenceDate;
      }

      record.paid = false;

      try {
        const response = await storeRecord(record);
        this.addStoreRecord(response.data);
      } catch (error) {
        this.errorFeedback(error.message);
      }
    },

    async editRecord(record) {
      try {
        const response = await editRecord(record);
        this.editStoreRecord(response.data);
      } catch (error) {
        this.errorFeedback(error.message);
      }
    },

    async togglePaidInformation(record) {
      try {
        const response = await updatePaidInformation(record);
        this.editStoreRecord(response.data);
      } catch (error) {
        this.errorFeedback(error.message);
      }
    },

    async removeRecord(record) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'teal',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (!result.isConfirmed || result.isDismissed) {
        return;
      }

      try {
        const response = await deleteRecord(record);

        if (!response) {
          return;
        }

        this.removeStoreRecord(record);

        await Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        )
      } catch (error) {
        this.errorFeedback(error.message);
      }
    },

    selectRecord(recordId) {
      const record = this.records.find(record => record.id === recordId);
      this.selectStoreRecord(record);
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
      editStoreRecord: 'edit',
      addStoreRecord: 'add',
      removeStoreRecord: 'remove',
      selectStoreRecord: 'selectRecord',
      resetSelectedRecord: 'resetSelectedRecord',
    }),
  },

  computed: {
    ...mapState(useRecordsStore, ['records', 'referenceDate', 'selectedRecord']),

    debts() {
      return this.records.reduce((prev, current) => {
        if (current?.type !== 'debt') {
          return prev;
        }

        return Number(current?.amount ?? 0) + prev;
      }, 0);
    },

    revenue() {
      return this.records.reduce((prev, current) => {
        if (current?.type !== 'revenue') {
          return prev;
        }

        return Number(current?.amount ?? 0) + prev;
      }, 0);
    }
  }
};
</script>