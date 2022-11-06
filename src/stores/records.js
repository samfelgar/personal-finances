import { format } from "date-fns";
import { defineStore } from "pinia";

export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: [],
    selectedRecord: null,
    referenceDate: new Date(),
  }),

  getters: {
    dateAsObject() {
      return {
        year: format(this.referenceDate, 'yyyy'),
        month: parseInt(format(this.referenceDate, 'MM')) - 1,
      }
    }
  },

  actions: {
    add(record) {
      this.records.push(record);
    },

    addRecords(records) {
      this.records.push(...records);
    },

    setRecords(records) {
      this.records = records;
    },

    edit(record) {
      const index = this.records.findIndex((r) => r.id === record.id);

      this.records[index] = record;
    },

    remove(record) {
      this.records = this.records.filter((r) => r.id !== record.id);
    },

    setReferenceDate(date) {
      this.referenceDate = date;
    },

    selectRecord(record) {
      this.selectedRecord = record;
    },

    resetSelectedRecord() {
      this.selectedRecord = null;
    }
  }
});