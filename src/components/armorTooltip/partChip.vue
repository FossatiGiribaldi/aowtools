<template>
  <div class="d-flex justify-center">
    <v-chip
      v-if="item.part === '头盔'"
      :x-small="xSmall"
      :small="small"
      label
      :class="partColor[0]"
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '军用眼镜'"
      :class="partColor[1]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '战术手套'"
      :class="partColor[2]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '战斗服'"
      :class="partColor[3]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '背包'"
      :class="partColor[4]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '弹药补充袋'"
      :class="partColor[5]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '军靴'"
      :class="partColor[6]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '称号'"
      :class="partColor[7]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '饰品'"
      :class="partColor[8]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '项链'"
      :class="partColor[9]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '戒指'"
      :class="partColor[10]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip
      v-else-if="item.part === '皮肤'"
      :class="partColor[11]"
      :x-small="xSmall"
      :small="small"
      label
      text-color="white">
      {{ item.part }}
    </v-chip>

    <v-chip v-else :x-small="xSmall" :small="small" label text-color="white">未知</v-chip>
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
      partColor: [
        'light-green lighten-1',
        'orange lighten-1',
        'cyan lighten-1',
        'red lighten-1',
        'pink lighten-1',
        'deep-purple lighten-1',
        'light-blue lighten-1',
        'teal lighten-1',
        'blue lighten-1',
        'purple lighten-1',
        'indigo lighten-1',
        'amber lighten-1',
        'lime lighten-1',
        'yellow lighten-1',
      ],
    };
  },
};
</script>
