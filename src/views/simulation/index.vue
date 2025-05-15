<template>
  <div>
    <div class="d-flex">
      <div style="position: fixed; padding: 10px">
        <div
          :style="{
            position: 'relative',
            width: '312px',
            height: '145px',
            padding: '16px 0 0 10px',
            background: `#ccc`,
            backgroundImage: `url(${require('@/assets/images/ui/bg.jpg')})`,
            backgroundPosition: '-3px 0',
          }">
          <div style="display: flex; justify-content: space-between; width: 292px; height: 108px">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-content: space-between;
                flex-wrap: wrap;
                width: 108px;
                height: 108px;
                background-color: transparent;
              ">
              <div class="weapon-item">
                <img :src="require('@/assets/images/ui/武器.jpg')" alt="武器" srcset="" />
              </div>

              <div
                class="weapon-item"
                style="position: relative; cursor: pointer"
                v-for="(item, index) in parts.slice(0, 8)"
                :key="index"
                @click="filterPart(item)"
                @contextmenu.prevent="take(item, index)">
                <armor-tooltip :item="item" right nudge-bottom="60" :disabled="!item.name">
                  <template slot="image">
                    <v-hover v-slot="{ hover }">
                      <div :class="{ 'on-hover': item.part === selectPart }">
                        <img :src="item.image" :alt="`${item.name}`" srcset="" />
                      </div>
                    </v-hover>
                  </template>
                </armor-tooltip>
              </div>
            </div>

            <div
              style="
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                justify-content: space-between;
                align-content: space-between;
                width: 70px;
                height: 108px;
                background-color: transparent;
              ">
              <div
                class="weapon-item"
                style="position: relative; cursor: pointer"
                v-for="(item, index) in parts.slice(8, 12)"
                :key="index"
                @click="filterPart(item)"
                @contextmenu.prevent="take(item, index + 8)">
                <armor-tooltip :item="item" right nudge-bottom="60" :disabled="!item.name">
                  <template slot="image">
                    <v-hover v-slot="{ hover }">
                      <div :class="{ 'on-hover': item.part === selectPart }">
                        <img :src="item.image" :alt="`${item.name}`" srcset="" />
                      </div>
                    </v-hover>
                  </template>
                </armor-tooltip>
              </div>

              <!-- <div class="weapon-item">
                <img :src="require('@/assets/images/ui/皮肤.jpg')" alt="皮肤" srcset="" />
              </div> -->
            </div>
          </div>

          <!-- 重置 -->
          <v-btn
            depressed
            color="grey lighten-1"
            @click="reset"
            height="24"
            min-width="24"
            style="position: absolute; padding: 0; bottom: 35px; right: 5px">
            <v-icon dense color="white">mdi-restore</v-icon>
          </v-btn>

          <!-- 收藏 -->
          <v-btn
            depressed
            color="grey lighten-1"
            @click="reset"
            height="24"
            min-width="24"
            :to="{
              name: 'scheme',
              params: { selectRole },
            }"
            style="position: absolute; padding: 0; bottom: 5px; right: 5px">
            <v-icon dense color="white">mdi-star</v-icon>
            <v-badge color="green" :content="msg" v-if="msg"></v-badge>
          </v-btn>
        </div>

        <v-btn depressed dark block class="flex-grow-1 my-2 indigo accent-1" @click="dialog = true">
          保存
        </v-btn>

        <div class="pb-6 text-caption">
          <v-subheader>属性统计</v-subheader>
          <v-divider class="mx-3 mb-2"></v-divider>
          <div class="px-5">
            <div class="d-flex justify-space-between">
              <span>防御力</span>
              <span>{{ defense }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>体力</span>
              <span>{{ stamina }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>耐力</span>
              <span>{{ endurance }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>精神力</span>
              <span>{{ mentalPower }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>爆头率增加</span>
              <span>{{ headshotRate }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>伤害范围减少</span>
              <span>{{ damageRange }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>一般移动速度增加</span>
              <span>{{ normalMoveSpeed }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>移动速度增加</span>
              <span>{{ moveSpeed }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>快速攀登</span>
              <span>{{ fastClimb }}%</span>
            </div>
            <div class="d-flex justify-space-between">
              <span>子弹数增加（以后增加）</span>
              <span>+{{ bulletCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin: 0 0 10px 362px">
        <div class="d-flex justify-space-between mb-3">
          <v-select
            v-model="selectRole"
            :items="['艾利克斯', '柯莉儿', '布莱克', '比比']"
            :menu-props="{ offsetY: true }"
            @change="filterRole"
            dense
            solo
            flat
            color="inital"
            hide-details="false"
            style="max-width: 150px">
            <template v-slot:append>
              <v-icon>mdi-menu-down</v-icon>
            </template>

            <template v-slot:selection="{ item }">
              <div class="d-flex align-center">
                <v-avatar color="primary" size="24" class="mr-2">
                  <img :src="require(`@/assets/images/ui/${item}.jpg`)" alt="" />
                </v-avatar>

                <div
                  style="
                    font-size: 0.9em;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  ">
                  {{ item }}
                </div>
              </div>
            </template>

            <template v-slot:item="{ item }">
              <v-avatar color="primary" size="24" class="mr-2">
                <img
                  v-if="item === '艾利克斯'"
                  :src="require('@/assets/images/ui/艾利克斯.jpg')"
                  alt="" />

                <img
                  v-if="item === '柯莉儿'"
                  :src="require('@/assets/images/ui/柯莉儿.jpg')"
                  alt="" />

                <img
                  v-if="item === '布莱克'"
                  :src="require('@/assets/images/ui/布莱克.jpg')"
                  alt="" />

                <img v-if="item === '比比'" :src="require('@/assets/images/ui/比比.jpg')" alt="" />
              </v-avatar>

              <span style="font-size: 0.9em">{{ item }}</span>
            </template>
          </v-select>

          <div class="d-flex align-center rounded" style="background-color: #fff">
            <v-btn text plain min-width="38" @click="changeLayout">
              <v-icon v-if="layout === 1" dense>mdi-view-module</v-icon>
              <v-icon v-else="layout === 0" dense>mdi-view-list</v-icon>
            </v-btn>

            <v-menu :close-on-content-click="false" offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text plain min-width="38" v-bind="attrs" v-on="on">
                  <v-icon v-if="sort === '升序'" dense>mdi-sort-descending</v-icon>
                  <v-icon v-else-if="sort === '降序'" dense>mdi-sort-ascending</v-icon>
                  <v-icon v-else dense>mdi-sort</v-icon>
                </v-btn>
              </template>

              <v-card style="display: flex; align-items: center; padding: 16px">
                <span style="font-size: 0.9em">排序:</span>
                <v-select
                  v-model="attribute"
                  :items="[
                    { text: '防御力', value: 'defense' },
                    { text: '体力', value: 'stamina' },
                    { text: '耐力', value: 'endurance' },
                    { text: '精神力', value: 'mentalPower' },
                    { text: '爆头率', value: 'headshotRate' },
                    { text: '伤害范围减少', value: 'damageRange' },
                    { text: '一般移动速度', value: 'normalMoveSpeed' },
                    { text: '移动速度', value: 'moveSpeed' },
                    { text: '快速攀登', value: 'fastClimb' },
                    { text: '子弹数', value: 'bulletCount' },
                  ]"
                  :menu-props="{ offsetY: true }"
                  @change="sortAttribute"
                  dense
                  solo
                  flat
                  hide-details="false"
                  style="margin-right: 10px; max-width: auto">
                  <template v-slot:append>
                    <v-icon>mdi-menu-down</v-icon>
                  </template>

                  <template v-slot:selection="{ item }">
                    <div
                      style="
                        font-size: 0.9em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      ">
                      {{ item.text }}
                    </div>
                  </template>

                  <template v-slot:item="{ item }">
                    <span style="font-size: 0.9em">{{ item.text }}</span>
                  </template>
                </v-select>

                <v-select
                  v-model="sort"
                  :items="['默认', '升序', '降序']"
                  :menu-props="{ offsetY: true }"
                  @change="sortAttribute"
                  dense
                  solo
                  flat
                  color="inital"
                  hide-details="false"
                  style="max-width: 90px">
                  <template v-slot:append>
                    <v-icon>mdi-menu-down</v-icon>
                  </template>

                  <template v-slot:selection="{ item }">
                    <div
                      style="
                        font-size: 0.9em;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      ">
                      {{ item }}
                    </div>
                  </template>

                  <template v-slot:item="{ item }">
                    <span style="font-size: 0.9em">{{ item }}</span>
                  </template>
                </v-select>
              </v-card>
            </v-menu>
          </div>
        </div>

        <v-text-field
          v-model="keyword"
          dense
          solo
          flat
          hide-details
          color="inital"
          placeholder="搜索装备"
          prepend-inner-icon="mdi-magnify"
          style="margin-bottom: 10px; font-size: 0.8em"
          @input="search"></v-text-field>

        <div style="display: flex; flex-wrap: wrap; width: 420px">
          <div
            v-if="layout === 0"
            v-for="(item, index) in list"
            :key="index"
            style="width: 42px; height: 42px; padding: 5px; cursor: pointer"
            @click="put(item, index)">
            <!-- 提示 -->
            <armor-tooltip :item="item" right nudge-bottom="60">
              <template slot="image">
                <v-hover v-slot="{ hover }">
                  <img
                    :src="item.image"
                    alt=""
                    srcset=""
                    class="rounded"
                    :class="{ 'on-hover': hover }" />
                </v-hover>
              </template>
            </armor-tooltip>
          </div>

          <!-- 列表 -->
          <div
            v-if="layout === 1"
            v-for="(item, index) in list"
            :key="index"
            style="width: 140px; padding: 5px">
            <div
              class="rounded-sm"
              style="
                display: flex;
                align-items: start;
                height: 46px;
                padding: 5px;
                background-color: #fff;
                cursor: pointer;
              "
              @click="put(item, index)">
              <img
                :src="item.image"
                alt=""
                srcset=""
                style="margin-right: 5px; border-radius: 4px" />

              <span class="font-weight-medium text--primary" style="font-size: 0.75em">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">保存配装</v-card-title>

        <v-card-text>
          方案标题：
          <v-text-field v-model="schemeTitle"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit">确定</v-btn>
          <v-btn color="primary" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Big from 'big.js';
import { nanoid } from 'nanoid';
import _ from 'lodash';

import armorTooltip from '@/components/armorTooltip/index.vue';

export default {
  components: { armorTooltip },
  data() {
    return {
      list: [],

      parts: [
        {
          name: null, // 名称
          image: require('@/assets/images/ui/头盔.jpg'), // 图标
          role: null, // 角色
          part: '头盔', // 部位
          defense: null, // 防御力
          stamina: null, // 体力
          endurance: null, // 耐力
          mentalPower: null, // 精神力
          headshotRate: null, // 爆头率
          damageRange: null, // 伤害范围
          normalMoveSpeed: null, // 一般移动速度
          moveSpeed: null, // 移动速度
          fastClimb: null, // 快速攀登
          bulletCount: null, // 子弹数
          id: '999999',
        },

        {
          name: null,
          image: require('@/assets/images/ui/军用眼镜.jpg'),
          role: null,
          part: '军用眼镜',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999998',
        },

        {
          name: null,
          image: require('@/assets/images/ui/战术手套.jpg'),
          role: null,
          part: '战术手套',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999997',
        },

        {
          name: null,
          image: require('@/assets/images/ui/战斗服.jpg'),
          role: null,
          part: '战斗服',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999995',
        },

        {
          name: null,
          image: require('@/assets/images/ui/背包.jpg'),
          role: null,
          part: '背包',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999996',
        },

        {
          name: null,
          image: require('@/assets/images/ui/弹药补充袋.jpg'),
          role: null,
          part: '弹药补充袋',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999993',
        },

        {
          name: null,
          image: require('@/assets/images/ui/军靴.jpg'),
          role: null,
          part: '军靴',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999992',
        },

        {
          name: null,
          image: require('@/assets/images/ui/称号.jpg'),
          role: null,
          part: '称号',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999991',
        },

        {
          name: null,
          image: require('@/assets/images/ui/饰品.jpg'),
          role: null,
          part: '饰品',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999990',
        },

        {
          name: null,
          image: require('@/assets/images/ui/戒指.jpg'),
          role: null,
          part: '戒指',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999989',
        },

        {
          name: null,
          image: require('@/assets/images/ui/项链.jpg'),
          role: null,
          part: '项链',
          defense: null,
          stamina: null,
          endurance: null,
          mentalPower: null,
          headshotRate: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
          id: '999988',
        },
      ],

      selectPart: '战斗服',

      selectRole: '艾利克斯',

      sort: '默认',

      attribute: 'moveSpeed',

      keyword: '',

      layout: 0,

      dialog: false,

      schemeTitle: '',

      msg: 0,
    };
  },

  methods: {
    put(item) {
      const index = this.parts.findIndex(e => e.part === item.part);

      this.$set(this.parts, index, item);
    },

    take(item, index) {
      this.$set(this.parts, index, {
        name: null,
        image: require(`@/assets/images/ui/${item.part}.jpg`),
        role: null,
        part: item.part,
        defense: null,
        stamina: null,
        headshotRate: null,
        endurance: null,
        mentalPower: null,
        damageRange: null,
        normalMoveSpeed: null,
        moveSpeed: null,
        fastClimb: null,
        bulletCount: null,
      });
    },

    filterPart(item) {
      this.selectPart = item.part;

      this.list = this.filterList;

      this.search();

      this.sortAttribute();
    },

    reset() {
      this.parts = [
        // {
        //   name: '头盔', // 名称
        //   role: null, // 角色
        //   part: '头盔', // 部位
        //   defense: null, // 防御力
        //   stamina: null, // 体力
        //   headshotRate: null, // 爆头率
        //   endurance: null, // 耐力
        //   mentalPower: null, // 精神力
        //   damageRange: null, // 伤害范围
        //   normalMoveSpeed: null, // 一般移动速度
        //   moveSpeed: null, // 移动速度
        //   fastClimb: null, // 快速攀登
        //   bulletCount: null, // 子弹数
        // },

        {
          name: null,
          image: require('@/assets/images/ui/头盔.jpg'),
          role: null,
          part: '头盔',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/军用眼镜.jpg'),
          role: null,
          part: '军用眼镜',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/战术手套.jpg'),
          role: null,
          part: '战术手套',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/战斗服.jpg'),
          role: null,
          part: '战斗服',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/背包.jpg'),
          role: null,
          part: '背包',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/弹药补充袋.jpg'),
          role: null,
          part: '弹药补充袋',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/军靴.jpg'),
          role: null,
          part: '军靴',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/称号.jpg'),
          role: null,
          part: '称号',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/饰品.jpg'),
          role: null,
          part: '饰品',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/戒指.jpg'),
          role: null,
          part: '戒指',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },

        {
          name: null,
          image: require('@/assets/images/ui/项链.jpg'),
          role: null,
          part: '项链',
          defense: null,
          stamina: null,
          headshotRate: null,
          endurance: null,
          mentalPower: null,
          damageRange: null,
          normalMoveSpeed: null,
          moveSpeed: null,
          fastClimb: null,
          bulletCount: null,
        },
      ];
    },

    submit() {
      this.$store.commit('INSERT_SCHEMELIST', {
        schemeTitle: this.schemeTitle,
        schemeRole: this.selectRole,
        parts: this.parts,
        id: nanoid(5),
      });

      this.msg++;

      this.dialog = false;
    },

    filterRole() {
      this.keyword = '';
      this.list = this.armorList.filter(
        item => item.role === this.selectRole && item.part === '头盔'
      );
      this.reset();
    },

    search() {
      if (this.keyword === ' ') return;

      this.sortAttribute();
    },

    changeLayout() {
      this.layout = +!this.layout;
    },

    sortAttribute() {
      let list = this.filterList;

      this.keyword && (list = this.searchList);

      if (this.sort === '默认') return (this.list = list);

      if (this.sort === '升序') {
        this.list = _.sortBy(list, item =>
          item[this.attribute] === null ? Infinity : item[this.attribute]
        );
      } else {
        this.list = _.sortBy(list, item =>
          item[this.attribute] === null ? -Infinity : item[this.attribute]
        ).reverse();
      }
    },
  },

  mounted() {
    this.list = this.filterList;
  },

  computed: {
    ...mapState(['armorList']),
    scheme() {
      return this.$store.state.scheme;
    },
    searchList() {
      return this.armorList.filter(item => {
        const regex = new RegExp(this.keyword.trim(), 'i');

        if (regex.test(item.name))
          return item.part.includes(this.selectPart) && item.role.includes(this.selectRole);
      });
    },
    filterList() {
      return this.armorList.filter(
        item => item.part === this.selectPart && item.role.includes(this.selectRole)
      );
    },
    defense() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.defense).toNumber(), 0);
    },
    stamina() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.stamina).toNumber(), 0);
    },
    headshotRate() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.headshotRate).toNumber(), 0);
    },
    endurance() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.endurance).toNumber(), 0);
    },
    mentalPower() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.mentalPower).toNumber(), 0);
    },
    damageRange() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.damageRange).toNumber(), 0);
    },
    normalMoveSpeed() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.normalMoveSpeed).toNumber(), 0);
    },
    moveSpeed() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.moveSpeed).toNumber(), 0);
    },
    fastClimb() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.fastClimb).toNumber(), 0);
    },
    bulletCount() {
      return this.parts.reduce((acc, cur) => new Big(acc).plus(+cur.bulletCount).toNumber(), 0);
    },
  },

  watch: {
    scheme: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value.schemeTitle) {
          this.parts = value.parts;
          this.selectRole = value.schemeRole;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.weapon-item {
  width: 32px;
  height: 32px;
  background-color: lightcoral;
  overflow: hidden;
}

.on-hover::after {
  content: '';
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
  box-shadow: 0 0 4px 4px #29b6f6;
  border: 2px solid #29b6f6;
}
</style>
