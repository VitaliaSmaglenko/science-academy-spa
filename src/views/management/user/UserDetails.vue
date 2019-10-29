<template>
  <ContentWrapper title="Дані користувача" action-route="UserList" action-text="Список користувачів">
    <div>
      <div>Ім'я</div>
      <div>{{ user.name }}</div>
    </div>
    <div>
      <div>Прізвище:</div>
      <div>{{ user.surname }}</div>
    </div>
    <div>
      <div>По-батькові:</div>
      <div>{{ user.patronymic }}</div>
    </div>
    <div>
      <div>E-mail:</div>
      <div>{{ user.email }}</div>
    </div>
    <div>
      <div>Науковий рівень:</div>
      <div>{{ user.science_degree }}</div>
    </div>
    <div>
      <div>Академічний рівень:</div>
      <div>{{ user.academic_rank }}</div>
    </div>
    <div>
      <div>Числеться у кафедрах:</div>
      <div>
        <div v-for="( department, index ) in user.departments" :key="index">
          {{ department.name }}
        </div>
      </div>
    </div>
    <div>
      <div>Ролі:</div>
      <div>
        <div v-for="( role, index ) in user.roles" :key="index">
          {{ role.name }}
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserDetails',
  data () {
    return {
      user: {}
    }
  },
  async created () {
    const id = this.$route.params.id
    this.user = await this.getUser(id)
  },
  methods: {
    ...mapActions('users', [
      'getUser'
    ])
  }
}
</script>

<style scoped>

</style>
