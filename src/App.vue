<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="white--text title text-no-wrap">
        {{ $t("message.appTitle") }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center justify-center gap-1">
        <div @click="changeLocale('pt')">
          <v-flag country="pt" :enabled="locale === 'pt'" />
        </div>
        <div @click="changeLocale('en')">
          <v-flag country="en" :enabled="locale === 'en'" />
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon to="/">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content to="/bar">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view class="px-5 py-5"></router-view>
    </v-main>

    <v-footer app class="font-weight-bold d-flex justify-center">
      {{ $t("message.developedBy") }} &nbsp;<a href="https://rafaeltrog.com"
        >Rafael Trog</a
      >
    </v-footer>
  </v-app>
</template>

<style scoped>
.gap-1 {
  gap: 1rem;
}
</style>

<script>
import LanguageFlag from "./components/LanguageFlag.vue";

export default {
  name: "App",
  data() {
    return {
      drawer: true,
      locale: this.$i18n.locale,
    };
  },
  mounted() {
    document.title = this.$t('message.appTitle')
  },
  components: {
    "v-flag": LanguageFlag,
  },
  computed: {
    items() {
      return [
        { title: this.$t("message.home"), icon: "mdi-home", path: "/" },
        {
          title: this.$t("message.registerAddress"),
          icon: "mdi-map-plus",
          path: "/cadastro",
        },
      ];
    },
  },
  methods: {
    changeLocale(locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
      document.title = this.$t('message.appTitle')
    },
  },
};
</script>