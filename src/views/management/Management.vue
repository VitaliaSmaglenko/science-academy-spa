<template>
  <div class="content">
    <div class="manage-title">
      Кабінет управління:
      <div class="manage-underline"></div>
    </div>
    <div class="manage-actions">
      <v-btn
        v-if="canManageDepartments"
        :to="{ name: 'DepartmentList' }"
        color="#983620"
      >
        Управління кафедрами
      </v-btn>
      <v-btn
        v-if="canManageUsers"
        :to="{ name: 'UserList' }"
        color="#983620"
      >
        Управління користувачами
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import roles from './../../constants/roles'

export default {
  name: 'Management',
  computed: {
    ...mapGetters('auth', [
      'getHighestRole'
    ]),
    canManageUsers () {
      return roles.MANAGEMENT_ROLES.some(r => r.value === this.getHighestRole)
    },
    canManageDepartments () {
      return this.getHighestRole === roles.ROLE_ADMIN.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .manage-actions {
    padding: 15px 40px 0 40px;
    display: flex;
    flex-direction: column;
    a {
      margin-bottom: 20px;
      align-self: self-start;
      color: #fff;
    }
  }
</style>
