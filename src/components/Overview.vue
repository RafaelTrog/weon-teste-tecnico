<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-divider></v-divider>

    <div class="d-flex px-4 py-3">
      <span class="font-weight-bold mr-3">
        {{ $t("message.publicPlace") }}
      </span>
      <span>
        {{ publicPlace }}
      </span>
    </div>

    <div class="d-flex px-4 py-3">
      <span class="font-weight-bold mr-3">
        {{ $t("message.complement") }}
      </span>
      <span v-if="complement">
        {{ complement }}
      </span>
      <span v-else> - </span>
    </div>

    <div class="d-flex px-4 py-3">
      <span class="font-weight-bold mr-3">
        {{ $t("message.neighborhood") }}
      </span>
      <span>
        {{ neighborhood }}
      </span>
    </div>

    <div class="d-flex px-4 py-3">
      <span class="font-weight-bold mr-3"> {{ $t("message.city") }} </span>
      <span>
        {{ city }}
      </span>
    </div>

    <div class="d-flex px-4 py-3">
      <span class="font-weight-bold mr-3">
        {{ $t("message.state").toUpperCase() }}
      </span>
      <span>
        {{ state }}
      </span>
    </div>

    <v-divider></v-divider>

    <div class="d-flex px-4 py-3 text-caption">
      <span class="font-weight-bold mr-3"> {{ $t("message.createdAt") }} </span>
      <span> {{ createdAt }} </span>
    </div>

    <div class="d-flex px-4 py-3 text-caption" v-if="updatedAt">
      <span class="font-weight-bold mr-3"> {{ $t("message.updatedAt") }} </span>
      <span> {{ updatedAt }} </span>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "OverviewCard",
  props: {
    title: String,
    publicPlace: String,
    complement: String,
    neighborhood: String,
    city: String,
    state: String,
    createdAt: String,
    updatedAt: String,
  },
};
</script>