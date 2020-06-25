<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Заисей пока нет.
      <router-link to="/record">Добавьте свою первую запись</router-link>
    </p>

    <section v-else >

      <HistoryTable
        :records="items"
        :page="page"
        :pageSize="pageSize"
      />

      <Paginate
        v-if="pageCount > 1"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'<i class=material-icons>chevron_left</i>'"
        :next-text="'<i class=material-icons>chevron_right</i>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >

      </Paginate>
<!--      todo: add buttons with pagesize ruller-->
<!--      <button v-on:click="pageSize = 2">2</button>-->
<!--      <button v-on:click="pageSize = 5">5</button>-->
<!--      <p>current pageSize: {{ pageSize }} ...</p>-->
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixin'
  import HistoryTable from "@/components/HistoryTable";

    export default {
      name: "History",
      mixins: [paginationMixin],
      data: () => ({
        loading: true,
        records: [],
        pageSize: 5,
      }),
      async mounted() {
        this.records = await this.$store.dispatch('fetchRecords')
        // const records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.setupPaginations(this.records.map(record => {
          return{
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId).title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',
          }
        }), this.pageSize)

        this.loading = false
      },
      components: {
        HistoryTable
      },
      watch: {
        '$route'(to, from){
          if (!to.query.page){
            // кликнули в сайдбаре на История
            this.pageChangeHandler(1);
            this.page = 1;
          }
        }
      }
    }
</script>

<style scoped>

</style>
