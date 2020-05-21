<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <div class="col s12 m6">

          <CategoryCreate @created="addNewCategory"/>

        </div>
        <div class="col s12 m6">

          <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="updateCategories"
          />
          <p v-else class="orange-text text-darken-4">У вас пока нет ни одной категории, попробуйте создать несколько</p>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from "@/components/CategoryCreate"
  import CategoryEdit from "@/components/CategoryEdit"

  export default {
    name: "Categories",
    data: () => ({
      categories: [],
      loading: true,
      updateCount: 0
    }),
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    },
    components: {CategoryCreate, CategoryEdit},
    methods: {
      addNewCategory(category) {
        this.categories.push(category)
        console.log(this.categories)
      },
      updateCategories(category) {
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
        this.updateCount++
      }
    }
  }
</script>

<style scoped>

</style>
