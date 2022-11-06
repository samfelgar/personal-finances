<template>
  <div>
    <form class="flex flex-col sm:w-1/4 mt-24 mx-auto px-4 sm:px-0 gap-4" @submit.prevent="authenticate">

      <Logo class="text-teal-400 self-center my-4" />

      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <input type="email" v-model="email" required class="py-2 px-3 rounded border outline-1 outline-teal-400">
      </div>

      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input type="password" v-model="password" required class="py-2 px-3 rounded border outline-1 outline-teal-400">
      </div>

      <div>
        <button type="submit"
          class="w-full bg-teal-400 hover:bg-teal-500 transition text-white my-2 p-3 rounded outline-teal-600">
          Entrar
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import { authenticate } from '../services/auth';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.vue';

export default {
  name: "Login",
  
  components: { Logo },

  data() {
    return {
      email: null,
      password: null,
    };
  },
  
  methods: {
    async authenticate() {
      const result = await authenticate(this.email, this.password);
      if (!result) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário ou senha inválidos",
        });
        return;
      }
      this.resetForm();
      this.$router.push("/");
    },
    resetForm() {
      this.email = null;
      this.password = null;
    }
  },
}
</script>