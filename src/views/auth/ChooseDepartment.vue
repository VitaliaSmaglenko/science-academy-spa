<template>
    <div class="container">
      <v-card class="post-login">
        <div class="post-login-title">
          Оберіть кафедру:
          <v-btn @click="logout" color="#983620">Змінити користувача</v-btn>
        </div>
        <v-card-text>
          <v-btn
            class="post-login-btn"
            v-for="item in user.departments"
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ChooseDepartment',
  computed: {
    ...mapState('auth', {
      user: state => state.user
    })
  },
  methods: {
    ...mapActions('auth', [
      'selectDepartment',
      'signOut'
    ]),
    async select (department) {
      await this.selectDepartment(department)
      this.$router.push({ name: 'Dashboard' })
    },
    logout () {
      this.signOut()
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
    display: flex;
    justify-content: space-between;
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
  .post-login-title {
    .v-btn__content {
      color: #fff;
      text-transform: capitalize;
    }
  }
</style>
