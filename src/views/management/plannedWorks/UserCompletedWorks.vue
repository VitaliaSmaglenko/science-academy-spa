<template>
  <ContentWrapper title="Лист виконанних робіт" :buttons="topButtons">
    <v-data-table
      :items="completedWorks"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      no-data-text="Ще не було додано виконаних робіт"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.work.name }}</td>
          <td class="text-start">{{ item.title }}</td>
          <td class="text-start">{{ item.reference }}</td>
          <td class="text-start">{{ item.number_of_hours }}</td>
          <td class="text-start">{{ item.season }}</td>
          <td class="text-start">
            {{ item.created_at ? new Date(item.created_at).toISOString().substring(0, 10) : '' }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'

export default {
  name: 'UserCompletedWorks',
  components: { ContentWrapper },
  data () {
    return {
      loading: true,
      topButtons: [
        { route: '', text: 'Норми робіт' },
        { route: '', text: 'Порівняти з планом' },
        { route: 'UserWorksList', text: 'Лист Викладачів' }
      ],
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Вид роботи', class: 'table-header left', value: 'work.name' },
        { text: 'Назва', class: 'table-header left', value: 'title' },
        { text: 'Посилання', class: 'table-header left', value: 'reference' },
        { text: 'Кількість годин', class: 'table-header left', value: 'number_of_hours' },
        { text: 'Осінь/Весна', class: 'table-header left', value: 'season' },
        { text: 'Дата створення', class: 'table-header left', value: 'created_at' }
      ]
    }
  },
  computed: {
    ...mapState('completedWorks', {
      completedWorks: state => state.completedWorks
    })
  },
  async created () {
    const id = this.$route.params.id
    await this.fetchCompletedWorksByUser(id)
    this.loading = false
  },
  methods: {
    ...mapActions('completedWorks', [
      'fetchCompletedWorksByUser'
    ])
  }
}
</script>
