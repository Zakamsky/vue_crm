<template>
  <div class="app-main-layout">

    <navbar @burger="isOpen = !isOpen" />

    <sidebar v-model="isOpen" />

    <main class="app-content" :class="{full: !isOpen}" >
      <Loader v-if="loading" class="mt-200"/>
      <div v-else class="app-page" >
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn" v-tooltip="['Создать новую запись']" data-position="left">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>

</template>

<script>
  import Navbar from "@/components/app/Navbar";
  import Sidebar from "@/components/app/Sidebar";
  import messages from '@/utils/messages'


  export default {
    name: "main-layout",
    data: () => ({
      isOpen: true,
      loading: true
    }),
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    },
    components: {
      Navbar, Sidebar
    },
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Что то пошло не так')
      }
    }
  }
</script>
<style scoped>
  .mt-200{
    margin-top: 110px;
  }
</style>
