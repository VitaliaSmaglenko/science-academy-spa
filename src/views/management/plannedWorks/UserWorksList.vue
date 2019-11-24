<template>
  <ContentWrapper title="Лист викладачів на кафедрі">
    <v-data-table
      :items="filteredUsers"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.email }}</td>
          <td class="text-start">{{ item.science_degree }}</td>
          <td class="text-start">{{ item.academic_rank }}</td>
          <td class="text-start">
            {{ item.created_at ? new Date(item.created_at).toISOString().substring(0, 10) : '' }}
          </td>
          <td class="text-start">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" :to="{ name: 'UserCompletedWorks', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Виконанні роботи
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" :to="{ name: 'UserPlannedWorks', params: { id: item.id } }">
                  <v-list-item-title class="action-item">
                    Планові роботи
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
import ContentWrapper from '../../../components/Layout/Management/ContentWrapper'
import constants from './../../../constants'

const {
  ROLE_TEACHER
} = constants.roles

export default {
  name: 'UserWorksList',
  components: { ContentWrapper },
  data () {
    return {
      ROLE_TEACHER,
      loading: true,
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'E-Mail', class: 'table-header left', value: 'email' },
        { text: 'Науковий рівень', class: 'table-header left', value: 'science_degree' },
        { text: 'Академічний рівень', class: 'table-header left', value: 'academic_rank' },
        { text: 'Дата регістрації', class: 'table-header left', value: 'created_at' },
        { text: '', sortable: false }
      ]
    }
  },
  async created () {
    await this.fetchUsersByDepartment(this.department.id)
    this.loading = false
  },
  computed: {
    ...mapState('auth', {
      department: state => state.department
    }),
    ...mapState('users', {
      users: state => state.users
    }),
    filteredUsers () {
      return this.users.filter(u => u.roles.some(r => r.name === ROLE_TEACHER.value))
    }
  },
  methods: {
    ...mapActions('users', [
      'fetchUsersByDepartment'
    ])
  }
}
</script>
