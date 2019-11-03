<template>
  <ContentWrapper title="Дані кафедри" action-route="DepartmentList" action-text="Список кафедр">
    <div>
      <div>Назва</div>
      <div>{{ department.department }}</div>
    </div>
    <div>
      <div>Місто:</div>
      <div>{{ department.city }}</div>
    </div>
  </ContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'

export default {
  name: 'DepartmentDetails',
  components: { ContentWrapper },
  data () {
    return {
      department: {}
    }
  },
  async created () {
    const id = this.$route.params.id
    this.department = await this.getDepartment(id)
  },
  methods: {
    ...mapActions('departments', [
      'getDepartment'
    ])
  }
}
</script>

<style scoped>

</style>
