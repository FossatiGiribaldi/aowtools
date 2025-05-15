<template>
  <div>
    <v-chip
      v-if="item.category === '步枪'"
      :x-small="isxSamll"
      :small="isSamll"
      label
      :class="categoryColor[0]"
      text-color="white">
      {{ item.category }}
    </v-chip>

    <v-chip
      v-else-if="item.category === '狙击枪'"
      :x-small="isxSamll"
      :small="isSamll"
      label
      :class="categoryColor[1]"
      text-color="white">
      {{ item.category }}
    </v-chip>

    <v-chip
      v-else-if="item.category === '反坦克炮'"
      :x-small="isxSamll"
      :small="isSamll"
      label
      :class="categoryColor[2]"
      text-color="white">
      {{ item.category }}
    </v-chip>

    <v-chip
      v-else-if="item.category === '散弹枪'"
      :x-small="isxSamll"
      :small="isSamll"
      label
      :class="categoryColor[3]"
      text-color="white">
      {{ item.category }}
    </v-chip>

    <v-chip
      v-else-if="item.category === '手枪'"
      :x-small="isxSamll"
      :small="isSamll"
      label
      :class="categoryColor[4]"
      text-color="white">
      {{ item.category }}
    </v-chip>

    <v-chip v-else :x-small="isxSamll" :small="isSamll" label text-color="white">未知</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
    isxSamll: {
      type: Boolean,
      default: false,
    },
    isSamll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      categoryColor: [
        'cyan lighten-1',
        'pink lighten-1',
        'deep-purple lighten-1',
        'orange lighten-1',
        'lime lighten-1',
      ],
    };
  },
};
</script>
