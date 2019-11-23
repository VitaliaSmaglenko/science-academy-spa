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
                    <td class="text-start">
                        <v-menu bottom offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                            </template>
                            <v-list>
                                <v-list-item class="action" :to="{ name: 'CompletedWorkDetails', params: { id: item.id } }">
                                    <v-list-item-title class="action-item">
                                        Детальніше
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item class="action" :to="{ name: 'CompletedWorkEdit', params: { id: item.id } }">
                                    <v-list-item-title class="action-item">
                                        Редагування
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item class="action" @click="removeCompletedWork(item.id)">
                                    <v-list-item-title class="action-item">
                                        Видалити
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../components/Layout/Management/ContentWrapper'

export default {
  name: 'CompletedWorksList',
  components: { ContentWrapper },
  data () {
    return {
      loading: true,
      topButtons: [
        { route: '', text: 'Норми робіт' },
        { route: 'PlannedWorksForUser', text: 'Планові роботи' },
        { route: 'CompletedWorkAdd', text: 'Додати роботу' }
      ],
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Вид роботи', class: 'table-header left', value: 'work.name' },
        { text: 'Назва', class: 'table-header left', value: 'title' },
        { text: 'Посилання', class: 'table-header left', value: 'reference' },
        { text: 'Кількість годин', class: 'table-header left', value: 'number_of_hours' },
        { text: 'Осінь/Весна', class: 'table-header left', value: 'season' },
        { text: 'Дата створення', class: 'table-header left', value: 'created_at' },
        { text: '', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState('completedWorks', {
      completedWorks: state => state.completedWorks
    })
  },
  async created () {
    await this.fetchCompletedWorks()
    this.loading = false
  },
  methods: {
    ...mapActions('completedWorks', [
      'fetchCompletedWorks',
      'deleteCompletedWork'
    ]),
    async removeCompletedWork (id) {
      await this.deleteCompletedWork(id)
      this.loading = true
      await this.fetchCompletedWorks()
      this.loading = false
    }
  }
}
</script>
