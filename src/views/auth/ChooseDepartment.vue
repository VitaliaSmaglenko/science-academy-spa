<template>
    <div class="container">
      <v-card class="post-login">
        <div class="post-login-title">
          Оберіть кафедру:
        </div>
        <v-card-text>
          <v-btn
            class="post-login-btn"
            v-for="item in departments"
            :key="item.id"
            color="#983620"
            @click="select(item)"
          >
            {{ item.name }}
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChooseDepartment',
  data () {
    return {
      departments: [
        {
          id: 1,
          name: 'Кафедра охорони праці, стандартизації та сертифікації'
        },
        {
          id: 2,
          name: 'Кафедра фізики, електротехніки і електроенергетики'
        },
        {
          id: 3,
          name: 'Кафедра інтегрованих технологій в машинобудуванні та зварювального виробництва'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', [
      'selectDepartment'
    ]),
    select (department) {
      this.selectDepartment(department)
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

  .post-login {
    width: 600px;
  }

  .post-login-title {
    font-size: 22px;
    padding: 15px;
  }

  .post-login-btn {
    margin: 2px 0;
    color: #fff;
    width: 100%;
  }
</style>

<style lang="scss">
  .post-login-btn {
    .v-btn__content {
      width: 100%;
      white-space: pre-wrap;
    }
  }
</style>
