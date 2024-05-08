<template>
  <div
    v-if="countrySetup[country]"
    v-bind:class="{ disabled: !enabled }"
    class="gap-1 cursor-pointer"
  >
    <img
      :src="countrySetup[country].img"
      :alt="countrySetup[country].alt"
      :title="countrySetup[country].alt"
      height="20"
    />
  </div>
</template>

<style scoped>
.disabled {
  filter: grayscale(1);
}

.gap-1 {
  gap: 1rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

<script>
import brSvg from "@/assets/br.svg";
import usSvg from "@/assets/us.svg";

export default {
  name: "LanguageFlag",
  props: {
    enabled: Boolean,
    country: String,
  },
  computed: {
    countrySetup() {
      return {
        pt: {
          img: brSvg,
          alt: this.$t("message.pt"),
        },
        en: {
          img: usSvg,
          alt: this.$t("message.en"),
        },
      };
    },
  },
};
</script>