<template>
  <div class="content">
    <div class="manage-title">
      Кабінет управління:
      <div class="manage-underline"></div>
    </div>
    <div class="manage-actions">
      <v-btn
        v-for="(action, index) in actions"
        :key="index"
        :to="action.to"
        color="#983620"
      >
        {{ action.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import roles from './../../constants/roles'

export default {
  name: 'Management',
  data () {
    return {
      [roles.ROLE_ADMIN.value]: [
        {
          name: 'Управління кафедрами',
          to: { name: '' }
        },
        {
          name: 'Управління користувачами',
          to: { name: 'UserList' }
        }
      ],
      [roles.ROLE_MANAGER.value]: [
        {
          name: 'Управління кафедрами',
          to: { name: '' }
        },
        {
          name: 'Управління користувачами',
          to: { name: 'UserList' }
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getHighestRole'
    ]),
    actions () {
      return this[this.getHighestRole]
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
