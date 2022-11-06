<template>
  <div>

    <div :class="{ 'sm:h-screen': !openNav, 'items-start': !openNav }" class="bg-teal-600 justify-end flex w-full p-6">
      <div aria-label="toggler" class="flex justify-center items-center">
        <button aria-label="open" @click="showNav" :class="{ hidden: openNav }" class="focus:outline-none focus:ring-2">
          <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 12H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 18H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button aria-label="close" @click="showNav" :class="{ hidden: !openNav }"
          class="focus:outline-none focus:ring-2">
          <svg class="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <div :class="{ '-translate-x-full': openNav, 'translate-x-0': openNav, hidden: !openNav }"
      class="transform sm:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start sm:h-screen w-full sm:w-80 bg-teal-600 flex-col pt-2 pb-4">

      <div class="mt-6 flex flex-col justify-start items-center pl-4 w-full space-y-3 pb-5">
        <button v-for="option in featuredOptions" :key="option.title"
          class="flex justify-start items-center space-x-6 w-full focus:outline-none focus:text-teal-300 text-white rounded">
          <span class="text-base leading-4">{{ option.title }}</span>
        </button>
      </div>

      <div v-for="option in options" :key="option.title" class="flex flex-col justify-start items-center px-6 w-full">

        <button @click="showMenu(option)"
          class="focus:outline-none focus:text-teal-300 text-left text-white flex justify-between items-center w-full py-5 space-x-14">
          <span class="text-sm leading-5 uppercase">{{ option.title }}</span>
          <svg class="transform" :class="{ 'rotate-180': !option.expanded }" width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div :class="{ 'hidden': !option.expanded }"
          class="flex justify-start flex-col w-full md:w-auto items-start pb-4">
          <a :href="suboption.href" v-for="suboption in option.suboptions" :key="suboption.title"
            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-teal-700 focus:text-white hover:bg-teal-700 text-gray-200 rounded px-3 py-2  w-full md:w-52">
            <span class="text-base leading-4">{{ suboption.title }}</span>
          </a>
        </div>
      </div>

      <div class="flex flex-col justify-start items-center px-6 w-full">
        <button @click="logout"
          class="focus:outline-none focus:text-teal-300 text-left text-white flex justify-between items-center w-full py-5 space-x-14">
          <span class="text-sm leading-5 uppercase">Sair</span>
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { logout } from '../services/auth';

export default {
  name: "Sidebar",

  data() {
    return {
      openNav: true,
      featuredOptions: [
        {
          title: 'Dashboard',
        },
        {
          title: 'Users',
        },
      ],
      options: [
        {
          title: 'Profile Overview',
          expanded: false,
          suboptions: [
            {
              title: 'Messages',
              href: '#',
            },
            {
              title: 'Security',
              href: '#',
            },
            {
              title: 'Settings',
              href: '#',
            },
            {
              title: 'Notifications',
              href: '#',
            },
            {
              title: 'Passwords',
              href: '#',
            },
            {
              title: 'Goals',
              href: '#',
            },
          ],
        },
      ],
    };
  },

  methods: {
    showNav() {
      this.openNav = !this.openNav;
    },

    showMenu(option) {
      option.expanded = !option.expanded;
    },

    async logout() {
      await logout();
      this.$router.push('/login');
    }
  }
}
</script>