<template>
  <v-tooltip
    transition="fade-transition"
    :right="right"
    :top="top"
    :nudge-bottom="nudgeBottom"
    :disabled="disabled">
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot name="image"></slot>
      </div>
    </template>

    <div class="pa-3">
      <div class="d-flex align-center">
        <img :src="item.image" alt="" class="mr-2 rounded" />

        <div>
          <span class="font-weight-medium subtitle-2 white--text">
            {{ item.name }}
          </span>

          <div class="d-flex">
            <!-- 角色 -->
            <role-chip :item="item" xSmall />

            <!-- 部位 -->
            <part-chip :item="item" xSmall />
          </div>
        </div>
      </div>

      <v-divider class="my-2 grey darken-2"></v-divider>

      <div class="text--secondary caption">
        <div v-if="item.defense" class="white--text">
          防御力：
          <span
            :class="item.defense < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'">
            {{ item.defense }}%
          </span>
        </div>

        <div v-if="item.stamina" class="white--text">
          体力：
          <span
            :class="item.stamina < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'">
            {{ item.stamina }}%
          </span>
        </div>
        <div v-if="item.endurance" class="white--text">
          耐力：
          <span
            :class="
              item.endurance < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.endurance }}%
          </span>
        </div>
        <div v-if="item.mentalPower" class="white--text">
          精神力：
          <span
            :class="
              item.mentalPower < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.mentalPower }}%
          </span>
        </div>
        <div v-if="item.headshotRate" class="white--text">
          爆头率增加：
          <span
            :class="
              item.headshotRate < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.headshotRate }}%
          </span>
        </div>
        <div v-if="item.damageRange" class="white--text">
          伤害范围减少：
          <span
            :class="
              item.damageRange < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.damageRange }}%
          </span>
        </div>
        <div v-if="item.normalMoveSpeed" class="white--text">
          一般移动速度增加：
          <span
            :class="
              item.normalMoveSpeed < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.normalMoveSpeed }}%
          </span>
        </div>
        <div v-if="item.moveSpeed" class="white--text">
          移动速度增加：
          <span
            :class="
              item.moveSpeed < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.moveSpeed }}%
          </span>
        </div>
        <div v-if="item.fastClimb" class="white--text">
          快速攀登：
          <span
            :class="
              item.fastClimb < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            {{ item.fastClimb }}%
          </span>
        </div>
        <div v-if="item.bulletCount" class="white--text">
          子弹数增加（以后增加）：
          <span
            :class="
              item.bulletCount < 0 ? 'red--text text--lighten-1' : 'green--text text--lighten-1'
            ">
            +{{ item.bulletCount }}
          </span>
        </div>
      </div>
    </div>
  </v-tooltip>
</template>

<script>
import roleChip from '@/components/armorTooltip/roleChip.vue';
import partChip from '@/components/armorTooltip/partChip.vue';

export default {
  components: { roleChip, partChip },
  props: {
    item: {
      required: true,
    },
    // 向顶部对齐
    top: {
      type: Boolean,
      default: false,
    },
    // 向右边对齐
    right: {
      type: Boolean,
      default: false,
    },
    // 向顶部微调内容
    nudgeBottom: {
      type: String,
      default: '0',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
