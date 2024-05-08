<template>
  <div>
    <v-data-table
      class="mt-3"
      :headers="headers"
      :items="addresses"
      :sort-by="['createdAt']"
      :sort-desc="[true]"
      :items-per-page="10"
      :footer-props="{
        itemsPerPageText: $t('message.addressesPerPage'),
        itemsPerPageOptions: [
          5,
          10,
          15,
          { text: $t('message.all'), value: -1 },
        ],
      }"
    >
      <template slot="header.state" slot-scope="{ header }">
        {{ header.text.toUpperCase() }}
      </template>

      <!-- </v-data-table> -->
      <!-- </div> -->
      <!-- </template> -->

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("message.addresses") }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" darkclass="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>&nbsp;{{ $t("message.new") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="cep"
                        @input="getCep"
                        :label="$t('message.zipCode')"
                        maxLength="8"
                        countertype="text"
                        :error-messages="zipCodeError"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.title"
                        :label="$t('message.name')"
                        required
                        :disabled="nameDisabled"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.publicPlace"
                        :label="$t('message.publicPlace')"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.complement"
                        :label="$t('message.complement')"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.neighborhood"
                        :label="$t('message.neighborhood')"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.city"
                        :label="$t('message.city')"
                        disabled
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.state"
                        :label="$t('message.state').toUpperCase()"
                        disabled
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="close">
                  {{ $t("message.cancel") }}
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="save"
                  :disabled="!canSave"
                >
                  {{ $t("message.save") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 text-center">
                {{ $t("message.confirmDeletion") }}
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="closeDelete">
                  {{ $t("message.cancel") }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  {{ $t("message.delete") }}
                </v-btn>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- </v-data-table> -->
      <!-- </div> -->
      <!-- </template> -->
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <!-- </v-data-table> -->
      <!-- </div> -->
      <!-- </template> -->
      <template v-slot:no-data>
        <span>{{ $t("message.noResults") }}</span>
      </template>
      <!-- </div> -->
      <!-- </template> -->
      <template
        slot="footer.page-text"
        slot-scope="{ pageStart, pageStop, itemsLength }"
      >
        {{ $t("message.displayingAddresses[0]") }} {{ pageStart }}
        {{ $t("message.displayingAddresses[1]") }} {{ pageStop }}
        {{ $t("message.displayingAddresses[2]") }} {{ itemsLength }}
        {{ $t("message.displayingAddresses[3]") }}
      </template>
      <!-- </div> -->
      <!-- </template> -->
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapActions, mapState } from "vuex";
export default {
  name: "RegisterView",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    cep: "",
    editedIndex: -1,
    editedItem: {
      title: "",
      publicPlace: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      createdAt: "",
      updatedAt: "",
      cep: "",
    },
    defautItem: {
      title: "",
      publicPlace: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      createdAt: "",
      updatedAt: "",
      cep: "",
    },
    zipCodeError: [],
  }),
  computed: {
    ...mapState("addressesStore", ["addresses"]),
    headers() {
      return [
        {
          text: this.$t("message.title"),
          value: "title",
        },
        {
          text: this.$t("message.publicPlace"),
          value: "publicPlace",
        },
        {
          text: this.$t("message.complement"),
          value: "complement",
        },
        {
          text: this.$t("message.neighborhood"),
          value: "neighborhood",
        },
        {
          text: this.$t("message.city"),
          value: "city",
        },
        {
          text: this.$t("message.state"),
          value: "state",
        },
        {
          text: this.$t("message.createdAt"),
          value: "createdAt",
        },
        { text: this.$t("message.updatedAt"), value: "updatedAt" },
        { text: this.$t("message.actions"), value: "actions", sortable: false },
      ];
    },
    formTitle() {
      return this.editedIndex === -1
        ? this.$t("message.newAddress")
        : this.$t("message.editAddress");
    },
    nameDisabled() {
      return this.editedIndex !== -1;
    },
    canSave() {
      return (
        JSON.stringify(this.editedItem) !== JSON.stringify(this.defautItem) &&
        this.editedItem.title !== ""
      );
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions("addressesStore", [
      "addAddress",
      "updateAddress",
      "deleteAddress",
    ]),
    getCep() {
      if (this.isValidZipCode(this.cep)) {
        axios
          .get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((response) => {
            this.editedItem.publicPlace = response.data.logradouro;
            this.editedItem.complement = response.data.complemento;
            this.editedItem.neighborhood = response.data.bairro;
            this.editedItem.city = response.data.localidade;
            this.editedItem.state = response.data.uf;
            this.editedItem.cep = response.data.cep;
          });
      } else {
        this.isValidCep = false;
      }
    },
    isValidZipCode(cep) {
      const test = /^\d{8}$/.test(cep);
      this.zipCodeError = test ? [] : [this.$t("message.invalidZipCode")];
      return test;
    },
    editItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteAddress(this.editedItem);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.cep = "";
      this.zipCodeError = [];
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.editedItem.updatedAt = moment().format("DD/MM/YYYY-HH:mm:ss");
        this.updateAddress({
          index: this.editedIndex,
          addressToUpdate: this.editedItem,
        });
      } else {
        this.editedItem.createdAt = moment().format("DD/MM/YYYY-HH:mm:ss");
        this.addAddress(this.editedItem);
      }
      this.close();
    },
  },
};
</script>