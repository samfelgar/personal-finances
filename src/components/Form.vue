<template>
  <form @submit.prevent="handleSubmit"
    class="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2 my-4 px-3 py-4 bg-white rounded">

    <div class="flex flex-col grow">
      <label for="description">Description</label>
      <input type="text" id="description" v-model="description" required
        class="outline-teal-500 border-2 rounded border-teal-100 h-10 p-2" />
    </div>

    <div class="flex flex-col grow">
      <label for="value">Amount</label>
      <input type="number" step="0.1" v-model="amount" required
        class="outline-teal-500 border-2 rounded border-teal-100 h-10 p-2" />
    </div>

    <div class="flex flex-col mx-4">
      <div>
        <input type="radio" id="revenue" name="type" :value="types.revenue" v-model="type" class="mr-2" />
        <label for="revenue">Revenue</label>
      </div>
      <div>
        <input type="radio" id="debt" name="type" :value="types.debt" v-model="type" class="mr-2" />
        <label for="debt">Debt</label>
      </div>
    </div>

    <div class="flex mt-4 ml-2 sm:mt-auto flex-row gap-2">
      <button type="button" @click="cancel" v-if="selectedRecord !== null"
        class="w-full sm:w-24 h-10 bg-gray-200 rounded">Cancel
      </button>
      <button type="submit" class="w-full sm:w-24 h-10 bg-teal-500 rounded text-white">
        {{ selectedRecord ? 'Save' : 'Add' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Form",

  props: {
    addRecordFunction: {
      type: Function,
      required: true,
    },
    editRecordFunction: {
      type: Function,
      required: true,
    },
    selectedRecord: {
      type: Object,
      required: false
    }
  },

  emits: ['cancelEditRequested'],

  data() {
    return {
      description: null,
      amount: null,
      type: 'revenue',
      types: {
        revenue: 'revenue',
        debt: 'debt'
      }
    };
  },

  methods: {
    handleSubmit() {
      let data = {
        description: this.description,
        amount: this.amount,
        type: this.type,
      };

      if (this.selectedRecord) {
        data = {
          ...this.selectedRecord,
          ...data,
        }
        this.editRecordFunction(data);
      } else {
        this.addRecordFunction(data);
      }

      this.resetForm();
    },

    resetForm() {
      this.description = null;
      this.amount = null;
      this.type = this.types.revenue;
    },

    cancel() {
      this.$emit('cancelEditRequested');
      this.resetForm();
    }
  },

  watch: {
    selectedRecord(newValue, oldValue) {
      if (newValue === null) {
        this.resetForm();
        return;
      }

      this.description = newValue.description;
      this.amount = newValue.amount;
      this.type = newValue.type;
    }
  }
}
</script>
