<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'CRM_Title'|localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{'Message_EmailRequired'|localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{'Message_EmailValid'|localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required)}"
        >
        <label for="password">
          {{'Password'|localize}}
        </label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{'Message_EnterPassword'|localize}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{'Login'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount'|localize}}
        <router-link to="/register" >
          {{'Register'|localize}}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>

  import {email, required} from 'vuelidate/lib/validators';
  import messages from '@/utils/messages';
  import localizeFilter from '@/filters/localize.filter'


  export default {
    name: "Login",
    metaInfo() {
      return {
        title: this.$title('Login')
      }
    },
    data: () => ({
      email: '',
      password: '',
    }),
    validations: {
      email: {email, required},
      password: {required},
    },
    mounted() {
      if(messages[this.$route.query.message]) {
        this.$message(localizeFilter(messages[this.$route.query.message]))
      }
    },
    methods: {
      async submitHandler() {

        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        const formData = {
          email: this.email,
          password: this.password,
        }

        try {

          await this.$store.dispatch('login', formData)
          this.$router.push('/')

        } catch (e) {}

      }
    }
  }
</script>

<style scoped>

</style>
