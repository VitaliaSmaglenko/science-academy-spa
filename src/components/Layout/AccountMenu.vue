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
        <v-list-item v-if="canManage" :to="{ name: 'Management' }">
          <v-list-item-title>Управління</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="iAmTeacher" :to="{ name: 'ScienceProfiles' }">
          <v-list-item-title>Наукові профілі</v-list-item-title>
        </v-list-item>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import roles from './../../constants/roles'

export default {
  name: 'AccountMenu',
  computed: {
    ...mapState('auth', {
      user: state => state.user
    }),
    ...mapGetters('auth', [
      'iAmTeacher'
    ]),
    canManage () {
      return roles.MANAGEMENT_ROLES.some(item => this.user.roles.map(r => r.name).includes(item.value))
    }
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
  .menu-link {
    text-decoration: none;
  }
</style>
