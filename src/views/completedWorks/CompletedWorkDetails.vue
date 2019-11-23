<template>
  <ContentWrapper title="Дані виконанної роботи" :buttons="[{ route: 'CompletedWorksList', text: 'Список виконанних робіт'}]">
    <KeyValueList v-if="!loading" :items="getKeyValueList()"></KeyValueList>
  </ContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import ContentWrapper from '../../components/Layout/Management/ContentWrapper'
import KeyValueList from '../../components/UI/KeyValueList'

export default {
  name: 'WorkDetails',
  components: { KeyValueList, ContentWrapper },
  data () {
    return {
      loading: true,
      completedWork: {}
    }
  },
  async created () {
    const id = this.$route.params.id
    this.completedWork = await this.getCompletedWork(id)
    this.loading = false
  },
  methods: {
    ...mapActions('completedWorks', [
      'getCompletedWork'
    ]),
    getKeyValueList () {
      return [
        { title: 'Вид роботи', value: this.completedWork.work.name },
        { title: 'Назва', value: this.completedWork.title },
        { title: 'Посилання', value: this.completedWork.reference },
        { title: 'Кількість годин', value: this.completedWork.number_of_hours },
        { title: 'Осінь/Весна', value: this.completedWork.season },
        { title: 'Дата створення', value: this.completedWork.created_at ? new Date(this.completedWork.created_at).toISOString().substring(0, 10) : '' }
      ]
    }
  }
}
</script>
