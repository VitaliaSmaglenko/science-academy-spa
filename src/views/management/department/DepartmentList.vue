<template>
  <ContentWrapper title="Лист кафедр" :buttons="[{ route: 'DepartmentCreate', text: 'Створити'}]">
    <v-data-table
      :items="departments"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.department }}</td>
          <td class="text-start">{{ item.city }}</td>
          <td class="text-start">
            <v-menu bottom offset-y v-if="!hasDepartment(item.id)">
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" :to="{ name: 'DepartmentDetails', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Детальніше
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" :to="{ name: 'DepartmentUpdate', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Редагування
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" @click="removeDepartment(item.id)">
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
import { mapActions, mapState, mapGetters } from 'vuex'
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'

export default {
  name: 'DepartmentList',
  components: { ContentWrapper },
  data () {
    return {
      loading: true,
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Назва', class: 'table-header left', value: 'department' },
        { text: 'Місто', class: 'table-header left', value: 'city' },
        { text: '', sortable: false }
      ]
    }
  },
  async created () {
    await this.fetchDepartments()
    this.loading = false
  },
  computed: {
    ...mapState('auth', {
      user: state => state.user
    }),
    ...mapGetters('auth', [
      'hasDepartment'
    ]),
    ...mapState('departments', {
      departments: state => state.departments
    })
  },
  methods: {
    ...mapActions('departments', [
      'fetchDepartments',
      'deleteDepartment'
    ]),
    async removeDepartment (id) {
      await this.deleteDepartment(id)
      this.loading = true
      await this.fetchDepartments()
      this.loading = false
    }
  }
}
</script>
