<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
  import paginationMixin from '@/mixins/pagination.mixin';
  import HistoryTable from "@/components/HistoryTable";
  import { Pie } from 'vue-chartjs';

    export default {
      name: "History",
      extends: Pie,
      mixins: [paginationMixin],
      data: () => ({
        loading: true,
        records: [],
        pageSize: 5,
      }),
      async mounted() {
        this.records = await this.$store.dispatch('fetchRecords')
        const categories = await this.$store.dispatch('fetchCategories')

        this.setup(categories)

        this.loading = false
      },
      methods: {
        setup(categories){
          this.setupPaginations(this.records.map(record => {
            return{
              ...record,
              categoryName: categories.find(c => c.id === record.categoryId).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? 'Доход' : 'Расход',
            }
          }), this.pageSize)

          this.renderChart({
            labels: categories.map(c => c.title),
            datasets: [{
              // label: 'Расходы по категориям',
              label: '# of Votes',
              data: categories.map(c => {
                return this.records.reduce((total, r) =>{
                  if (r.categoryId === c.id && r.type === 'outcome') {
                    total += +r.amount
                  }
                  return total
                }, 0)
              }),
              backgroundColor: [
                '#ff8a80',
                '#ff80ab',
                '#ea80fc',
                '#b388ff',
                '#8c9eff',
                '#82b1ff',
                '#80d8ff',
                '#84ffff',
                '#a7ffeb',
                '#b9f6ca',
                '#ccff90',
                '#f4ff81',
                '#ffff8d',
                '#ffe57f',
                '#ffd180',
                '#ff9e80'
              ],
              borderColor: [
                '#ff5252',
                '#ff4081',
                '#e040fb',
                '#7c4dff',
                '#536dfe',
                '#448aff',
                '#40c4ff',
                '#18ffff',
                '#64ffda',
                '#69f0ae',
                '#b2ff59',
                '#eeff41',
                '#ffff00',
                '#ffd740',
                '#ffab40',
                '#ff6e40'
              ],
              borderWidth: 1
            }]
          })
        }
      },
      components: {
        HistoryTable
      },
      watch: {
        '$route'(to, from){
          if (!to.query.page){
            this.pageChangeHandler(1, this.pageSize);
            this.page = 1;
          }
        }
      }
    }
</script>

<style scoped>

</style>
