<template>
  <div class="d-flex justify-center">
    <div v-if="item.role?.includes('艾利克斯柯莉儿布莱克比比')" class="d-flex mr-1">
      <v-chip
        :x-small="xSmall"
        :small="small"
        label
        :class="roleColor[0]"
        class="mr-1"
        text-color="white">
        {{ item.role?.slice(0, 1) }}
      </v-chip>

      <v-chip
        :x-small="xSmall"
        :small="small"
        label
        :class="roleColor[1]"
        class="mr-1"
        text-color="white">
        {{ item.role?.slice(4, 5) }}
      </v-chip>

      <v-chip
        :x-small="xSmall"
        :small="small"
        label
        class="mr-1"
        :class="roleColor[2]"
        text-color="white">
        {{ item.role?.slice(7, 8) }}
      </v-chip>

      <v-chip :x-small="xSmall" :small="small" label :class="roleColor[3]" text-color="white">
        {{ item.role?.slice(10, 11) }}
      </v-chip>
    </div>

    <div v-else class="d-flex mr-1">
      <v-chip
        v-if="item.role === '艾利克斯'"
        :class="roleColor[0]"
        :x-small="xSmall"
        :small="small"
        label
        text-color="white">
        {{ item.role?.slice(0, 1) }}
      </v-chip>

      <v-chip
        v-else-if="item.role === '柯莉儿'"
        :class="roleColor[1]"
        :x-small="xSmall"
        :small="small"
        label
        text-color="white">
        {{ item.role?.slice(0, 1) }}
      </v-chip>

      <v-chip
        v-else-if="item.role === '布莱克'"
        :class="roleColor[2]"
        :x-small="xSmall"
        :small="small"
        label
        text-color="white">
        {{ item.role?.slice(0, 1) }}
      </v-chip>

      <v-chip
        v-else-if="item.role === '比比'"
        :class="roleColor[3]"
        :x-small="xSmall"
        :small="small"
        label
        text-color="white">
        {{ item.role?.slice(0, 1) }}
      </v-chip>

      <v-chip v-else :x-small="xSmall" :small="small" label text-color="white">未知</v-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
    xSmall: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      roleColor: ['orange lighten-1', 'pink lighten-1', 'red lighten-1', 'purple lighten-1'],
    };
  },
};
</script>
