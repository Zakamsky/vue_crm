<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">

          <CategoryCreate @created="addNewCategory"/>

        </div>
        <div class="col s12 m6">

          <CategoryEdit />

        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from "@/components/CategoryCreate"
  // import CategoryCreate from ""
  import CategoryEdit from "@/components/CategoryEdit"

  export default {
    name: "Categories",
    data: () => ({
      categories: []
    }),
    components: {CategoryCreate, CategoryEdit},
    methods: {
      addNewCategory(category) {
        this.categories.push(category)
        console.log(this.categories)
      }
    }
  }
</script>

<style scoped>

</style>
