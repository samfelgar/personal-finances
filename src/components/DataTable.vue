<template>
  <div class="rounded-t overflow-clip overflow-x-scroll sm:overflow-x-auto mb-4">
    <table class="sm:table-fixed w-full text-center">
      <thead>
        <tr class="bg-teal-500">
          <th v-for="header in headers" :key="header" class="py-4">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.id" class="even:bg-white odd:bg-teal-50 h-14">
          <td>{{ record.description }}</td>
          <td>
            <v-icon name="hi-solid-plus-circle" fill="teal" scale="1.2" v-if="isRevenue(record)" />
            <v-icon name="hi-solid-minus-circle" fill="red" scale="1.2" v-if="!isRevenue(record)" />
          </td>
          <td>{{ record.amount }}</td>
          <td>
            <button class="py-1 px-2" v-if="record.paid" @click="markAsUnpaid(record)">
              <v-icon name="fa-check-circle" fill="teal" v-if="record.paid" scale="1.5" />
            </button>
            <button class="py-1 px-2" v-if="!record.paid" @click="markAsPaid(record)">
              <v-icon name="fa-exclamation-circle" fill="red" v-if="!record.paid" scale="1.5" />
            </button>
          </td>
          <td>
            <div class="flex flex-row gap-1 justify-center">
              <button type="button" @click="() => this.selectRecord(record.id)"
                class="rounded text-white bg-teal-500 py-2 px-4 shadow-md shadow-gray-400 hover:bg-teal-400 active:bg-teal-600 active:shadow-sm active:shadow-gray-500">
                <v-icon name="fa-pencil-alt" fill="white" />
              </button>
              <button type="button" @click="() => this.deleteRecord(record)"
                class="rounded text-white bg-red-500 py-2 px-4 shadow-md shadow-gray-400 hover:bg-red-400 active:bg-red-600 active:shadow-sm active:shadow-gray-500">
                <v-icon name="fa-trash-alt" fill="white" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
  FaCheckCircle,
  FaExclamationCircle, FaPencilAlt,
  FaTrashAlt,
  HiSolidMinusCircle,
  HiSolidPlusCircle
} from "oh-vue-icons/icons";
import { mapState } from "pinia";
import { useRecordsStore } from "../stores/records";

export default {
  name: "DataTable",

  components: {
    'v-icon': OhVueIcon,
  },

  props: {
    deleteRecord: {
      type: Function,
      required: true,
    },
    selectRecord: {
      type: Function,
      required: true,
    },
    editRecord: {
      type: Function,
      required: true,
    }
  },

  mounted() {
    addIcons(FaCheckCircle, FaExclamationCircle, HiSolidPlusCircle, HiSolidMinusCircle, FaPencilAlt, FaTrashAlt);
  },

  data() {
    return {
      headers: [
        'Description',
        'Type',
        'Amount',
        'Paid',
        'Options',
      ]
    };
  },

  methods: {
    isRevenue(record) {
      return record.type === 'revenue';
    },

    markAsPaid(record) {
      const data = {
        ...record,
        paid: true,
      };
      this.editRecord(data);
    },

    markAsUnpaid(record) {
      const data = {
        ...record,
        paid: false,
      };
      this.editRecord(data);
    }
  },

  computed: {
    ...mapState(useRecordsStore, ['records']),
  }
}
</script>

<style scoped>
th,
td {
  padding-inline: 2rem;
}
</style>