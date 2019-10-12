<template>
  <div class="container">
    <v-card class="login">
      <div class="login-logo">
        <img alt="УIПА" :src="Logo"/>
      </div>
      <v-card-text>
        <div class="error-msg" v-if="error">
          {{ error }}
        </div>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="credentials.email"
            :rules="emailRules"
            label="Емейл"
            required
          ></v-text-field>
          <v-text-field
            v-model="credentials.password"
            :rules="passwordRules"
            label="Пароль"
            type="password"
            required
          ></v-text-field>
          <v-checkbox
            v-model="credentials.rememberMe"
            label="Запам'ятати мене"
            color="#983620"
            required
          ></v-checkbox>
          <v-btn
            :disabled="!valid"
            color="#983620"
            @click="login"
          >
            Увійти
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Logo from './../../assets/Logo.png'

export default {
  name: 'SignIn',
  data: () => ({
    Logo,
    valid: true,
    credentials: {
      email: '',
      password: '',
      rememberMe: false
    },
    passwordRules: [
      v => !!v || 'Пароль не може бути порожнім'
    ],
    emailRules: [
      v => !!v || 'Емейл не може бути порожнім',
      v => /.+@.+\..+/.test(v) || 'Емейл має буди валідним'
    ]
  }),
  computed: {
    ...mapState('auth', {
      error: state => state.error
    })
  },
  methods: {
    ...mapActions('auth', [
      'signIn'
    ]),
    login () {
      this.signIn(this.credentials)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 500px;
  }

  .login-logo {
    display: flex;
    justify-content: center;
    padding: 15px;
  }
</style>
