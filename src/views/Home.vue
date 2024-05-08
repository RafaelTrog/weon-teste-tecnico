<template>
  <div>
    <div v-if="addresses.length > 0" class="flex-column">
      <v-overview
        v-for="(address, index) in lastThreeAddresses"
        :key="index"
        :title="address.title"
        :publicPlace="address.publicPlace"
        :complement="address.complement"
        :neighborhood="address.neighborhood"
        :city="address.city"
        :state="address.state"
        :createdAt="address.createdAt"
        :updatedAt="address.updatedAt"
      />
    </div>
    <span v-else>{{ $t('message.noRegisters') }}</span>
  </div>
</template>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>

<script>
import OverviewCard from "../components/Overview.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    "v-overview": OverviewCard,
  },
  computed: {
    ...mapState("addressesStore", ["addresses"]),
    lastThreeAddresses() {
      return [...this.addresses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
    },
  },
};
</script>