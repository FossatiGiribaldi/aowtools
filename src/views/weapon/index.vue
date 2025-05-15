<template>
  <div>
    <div class="d-felx mb-1">
      <!-- 分类 -->
      <v-chip-group v-model="select" active-class="grey darken-4 white--text">
        <div class="d-flex flex-wrap" style="width: 672px">
          <v-chip
            v-for="tag in ['步枪', '狙击枪', '反坦克炮', '散弹枪', '手枪']"
            :key="tag"
            :value="tag"
            class="mb-2 px-2">
            <v-avatar color="primary" size="24" class="mr-1">
              <img :src="require(`@/assets/images/ui/weapon/${tag}.jpg`)" alt="" />
            </v-avatar>
            {{ tag }}
          </v-chip>
        </div>
      </v-chip-group>
    </div>

    <v-card class="pa-5">
      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="keyword"
          dense
          solo
          color="inital"
          background-color="#fff"
          prepend-inner-icon="mdi-magnify"
          hide-details="false"
          placeholder="搜索武器"
          class="mb-4"
          style="font-size: 0.8em"></v-text-field>
      </div>

      <v-data-table
        dense
        :header-props="{ sortIcon: 'mdi-menu-up' }"
        :headers="headers"
        :items="pagedList"
        :items-per-page="page"
        :custom-sort="customSort"
        hide-default-footer
        mobile-breakpoint>
        <template v-slot:[`item.name`]="{ item }">
          <div class="d-flex align-center w-[500px]">
            <v-tooltip top transition="fade-transition">
              <template v-slot:activator="{ on, attrs }">
                <div
                  style="
                    margin-right: 10px;
                    width: 22px;
                    height: 22px;
                    border-radius: 4px;
                    overflow: hidden;
                  "
                  v-bind="attrs"
                  v-on="on">
                  <img
                    style="width: 28px; height: 28px; margin-top: -3px; margin-left: -3px"
                    :src="`/resource/weapon/${item.image}`"
                    :key="item.id"
                    :alt="item.name" />
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
                      <!-- 分类纸片 -->
                      <category-Chip :item="item" isxSamll />
                    </div>
                  </div>
                </div>
                <v-divider class="my-2 grey darken-2"></v-divider>

                <div class="text--secondary caption">
                  <div v-if="item.damage" class="white--text">
                    伤害：
                    <span class="green--text text--lighten-1">{{ item.damage }}</span>
                  </div>

                  <div v-if="item.bullets" class="d-flex white--text">
                    子弹/弹夹数：
                    <div class="d-flex caption green--text text--lighten-1">
                      <span>{{ item.bullets.toString().padStart(3, '0') }}</span>
                      <span>/</span>
                      <span>{{ item.clip.toString().padStart(2, '0') }}</span>
                    </div>
                  </div>
                  <div v-if="item.speed" class="white--text">
                    弹速：
                    <span class="green--text text--lighten-1">{{ item.speed }}</span>
                  </div>
                  <div v-if="item.delay" class="white--text">
                    延迟：
                    <span class="green--text text--lighten-1">{{ item.delay }}</span>
                  </div>
                  <div v-if="item.range" class="white--text">
                    射程：
                    <span class="green--text text--lighten-1">{{ item.range }}</span>
                  </div>
                  <div v-if="item.recoil" class="white--text">
                    后坐力：
                    <span class="green--text text--lighten-1">{{ item.recoil }}</span>
                  </div>
                </div>
              </div>
            </v-tooltip>

            <span class="caption text-no-wrap">{{ item.name }}</span>
          </div>
        </template>

        <template v-slot:[`item.category`]="{ item }">
          <div class="w-[500px]"><category-chip :item="item" isSamll /></div>
        </template>

        <template v-slot:[`item.damage`]="{ item }">
          <span class="caption">{{ item.damage }}</span>
        </template>

        <template v-slot:[`item.bullets`]="{ item }">
          <div class="d-flex caption">
            <span>{{ item.bullets.toString().padStart(3, '0') }}</span>
            <span>/</span>
            <span>{{ item.clip.toString().padStart(2, '0') }}</span>
          </div>
        </template>

        <template v-slot:[`item.speed`]="{ item }">
          <span class="caption">{{ item.speed }}</span>
        </template>

        <template v-slot:[`item.delay`]="{ item }">
          <span class="caption">{{ item.delay }}</span>
        </template>

        <template v-slot:[`item.range`]="{ item }">
          <span class="caption">{{ item.range }}</span>
        </template>

        <template v-slot:[`item.recoil`]="{ item }">
          <span v-if="item.recoil" class="caption">{{ item.recoil }}</span>
        </template>
      </v-data-table>

      <div class="text-center py-2">
        <v-pagination
          color="indigo accent-1"
          v-model="currentPage"
          :length="total"
          :total-visible="5"
          @input="changePage"></v-pagination>
      </div>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="340"
      overlay-opacity="0.7"
      no-click-animation
      transition="scroll-y-transition">
      <v-card class="pa-1">
        <v-card-title style="flex-wrap: nowrap">
          <img :src="weaponDetail.image" alt="" style="margin-right: 10px; border-radius: 4px" />
          <div>
            <span class="font-weight-bold text--primary">{{ weaponDetail.name }}</span>
            <div>
              <span style="font-size: 0.7em">{{ weaponDetail.category }}</span>
            </div>
          </div>
        </v-card-title>

        <v-divider class="my-2 mx-4"></v-divider>

        <v-card-text>
          <div class="text--secondary">
            <div>伤害：{{ weaponDetail.damage }}</div>
            <div>子弹/弹夹数：{{ bullets }}</div>
            <div>弹速：{{ weaponDetail.speed }}</div>
            <div>延迟：{{ weaponDetail.delay }}</div>
            <div>射程：{{ weaponDetail.range }}</div>
            <div>后坐力：{{ weaponDetail.recoil }}</div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="indigo lighten-1" depressed @click="dialog = false">
            <span style="color: #fff">关闭</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import data from '@/weapon.json';

import data from '/resource/weapon.json';
import categoryChip from '@/views/weapon/components/categoryChip.vue';
import _ from 'lodash';

export default {
  components: { categoryChip },
  data() {
    return {
      headers: [
        { text: '名称', value: 'name', align: 'start', class: 'caption', width: '250' },
        { text: '分类', value: 'category', class: 'caption', width: '100' },
        { text: '伤害', value: 'damage', class: 'caption' },
        { text: '子弹/弹夹数', value: 'bullets', class: 'caption' },
        { text: '弹速', value: 'speed', class: 'caption' },
        { text: '延迟', value: 'delay', class: 'caption' },
        { text: '射程', value: 'range', class: 'caption' },
        { text: '后坐力', value: 'recoil', class: 'caption' },
      ],

      desserts: data,

      dialog: false,

      keyword: '',

      select: '',

      weaponDetail: {},

      currentPage: 1,

      page: 15,

      attribute: 'delay',
    };
  },

  created() {
console.log(data);

  },

  computed: {
    total() {
      return Math.ceil(this.filterList.length / this.page);
    },

    filterList() {
      let list = [];

      if (!this.select) {
        list = data;
      } else {
        list = data.filter(item => this.select === item.category);
      }

      if (this.keyword)
        return list.filter(item => new RegExp(this.keyword.trim(), 'i').test(item.name));

      return list;
    },

    pagedList() {
      const start = (this.currentPage - 1) * this.page;

      const end = start + this.page;

      const arr = this.filterList.slice(start, end);

      return arr;
    },

    bullets() {
      return `${this.weaponDetail.bullets?.toString().padStart(3, '0')}/${this.weaponDetail?.clip
        ?.toString()
        .padStart(2, '0')}`;
    },
  },

  methods: {
    customSort(items, sortBy, sortDesc) {
      if (!sortBy.length) {
        // 默认排序
        return items;
      }

      const [isSortDesc] = sortDesc;
      const [sort] = sortBy;

      const start = (this.currentPage - 1) * this.page;

      const end = start + this.page;

      if (isSortDesc) {
        // 降序+分页
        return _.sortBy(this.filterList, item => item[sort])
          .reverse()
          .slice(start, end);
      } else {
        // 升序+分页
        return _.sortBy(this.filterList, item => item[sort]).slice(start, end);
      }
    },

    changePage(newPage) {
      this.currentPage = newPage;
    },
  },

  watch: {
    select() {
      this.currentPage = 1;
    },
  },
};
</script>
