<template>
  <ContentWrapper title="Лист науковий профілей">
    <template v-slot:actions>
      <v-btn @click="addProfile" color="#983620">Додати профіль</v-btn>
    </template>
    <v-data-table
      :items="scienceProfiles"
      :headers="headers"
      locale="ru-RU"
      :loading="loading"
      no-data-text="Профілей ще не було додано"
      loading-text="Завантаження..."
    >
      <template v-slot:item="{ item }">
        <tr>
          <td class="text-start">{{ item.id }}</td>
          <td class="text-start">{{ item.title }}</td>
          <td class="text-start">{{ item.index }}</td>
          <td class="text-start">{{ item.profile_link }}</td>
          <td class="text-start">{{ item.number_of_publication }}</td>
          <td class="text-start">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="ma-2" v-on="on" icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item class="action" @click="editProfile(item.id)">
                  <v-list-item-title class="action-item">
                    Редагування
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="action" @click="removeScienceProfile(item.id)">
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
    <v-dialog
      v-model="addScienceProfileDialog"
      scrollable
      max-width="700px"
    >
      <AddScienceProfileDialog
        v-on:cancel="addScienceProfileDialog = false"
        v-on:done="addScienceProfileDialog = false"
      />
    </v-dialog>
    <v-dialog
      v-model="editScienceProfileDialog"
      scrollable
      max-width="700px"
    >
      <EditScienceProfileDialog
        :value="editScienceProfileDialog"
        :id="targetId"
        v-on:cancel="editScienceProfileDialog = false"
        v-on:done="editScienceProfileDialog = false"
      />
    </v-dialog>
  </ContentWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContentWrapper from '../../components/Layout/Management/ContentWrapper'
import AddScienceProfileDialog from '../../components/Dialogs/ScienceProfile/AddScienceProfileDialog'
import EditScienceProfileDialog from '../../components/Dialogs/ScienceProfile/EditScienceProfileDialog'

export default {
  name: 'ScienceProfiles',
  components: { ContentWrapper, AddScienceProfileDialog, EditScienceProfileDialog },
  data () {
    return {
      addScienceProfileDialog: false,
      editScienceProfileDialog: false,
      targetId: null,
      loading: true,
      headers: [
        { text: 'Id', class: 'table-header left', value: 'id' },
        { text: 'Назва', class: 'table-header left', value: 'title' },
        { text: 'Індекс', class: 'table-header left', value: 'index' },
        { text: 'Посилання', class: 'table-header left', value: 'profile_link' },
        { text: 'Кількість публікацій', class: 'table-header left', value: 'number_of_publication' },
        { text: '', sortable: false }
      ]
    }
  },
  async created () {
    await this.fetchScienceProfilesForUser()
    this.loading = false
  },
  computed: {
    ...mapState('scienceProfiles', {
      scienceProfiles: state => state.scienceProfiles
    })
  },
  methods: {
    ...mapActions('scienceProfiles', [
      'fetchScienceProfilesForUser',
      'deleteScienceProfile'
    ]),
    async removeScienceProfile (id) {
      await this.deleteScienceProfile(id)
      this.loading = true
      await this.fetchScienceProfilesForUser()
      this.loading = false
    },
    addProfile () {
      this.addScienceProfileDialog = true
    },
    editProfile (id) {
      this.targetId = id
      this.editScienceProfileDialog = true
    }
  }
}
</script>
