<template>
  <ContentWrapper title="Дані користувача" action-route="UserList" action-text="Список користувачів">
    <KeyValueList :items="info" :sub-items-keys="{'departments':'name', 'roles':'name'}"></KeyValueList>
  </ContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import KeyValueList from '../../../components/UI/KeyValueList'

export default {
  name: 'UserDetails',
  components: { KeyValueList, ContentWrapper },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    info () {
      return [
        { key: 'name', title: 'Ім\'я', value: this.user.name },
        { key: 'surname', title: 'Прізвище', value: this.user.surname },
        { key: 'patronymic', title: 'По-батькові', value: this.user.patronymic },
        { key: 'email', title: 'E-mail', value: this.user.email },
        { key: 'science_degree', title: 'Науковий рівень', value: this.user.science_degree },
        { key: 'academic_rank', title: 'Рівень', value: this.user.academic_rank },
        { key: 'departments', title: 'Числеться у кафедрах', value: this.user.departments },
        { key: 'roles', title: 'Ролі', value: this.user.roles }
      ]
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
