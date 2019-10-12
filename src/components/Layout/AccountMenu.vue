<template>
  <div class="account">
    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        <div
          class="account-btn"
          v-on="on"
        >
          {{ user.email }}
          <v-icon>mdi-account-box</v-icon>
        </div>
      </template>
      <v-list>
        <v-list-item @click="selectNewDepartment">
          <v-list-item-title>Змінити кафедру</v-list-item-title>
        </v-list-item>
        <v-list-item @click="unauthorize">
          <v-list-item-title>Вийти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AccountMenu',
  computed: {
    ...mapState('auth', {
      user: state => state.user
    })
  },
  methods: {
    ...mapActions('auth', [
      'signOut',
      'changeDepartment'
    ]),
    unauthorize () {
      this.signOut()
    },
    selectNewDepartment () {
      this.changeDepartment()
    }
  }
}
</script>

<style lang="scss" scoped>
  .account {
    padding: 20px;
  }
  .account-btn {
    cursor: pointer;
    color: #983620;
    i {
      color: #983620;
    }
  }
</style>
