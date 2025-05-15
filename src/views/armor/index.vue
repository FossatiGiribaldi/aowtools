<template>
  <div>
 <div class="mb-1">
      <!-- 角色 -->
      <v-chip-group v-model="selectRole" mandatory active-class="grey darken-4 white--text">
        <v-chip
          v-for="tag in ['艾利克斯', '柯莉儿', '布莱克', '比比']"
          :key="tag"
          :value="tag"
          class="px-2">
          <v-avatar color="primary" size="24" class="mr-1">
            <img :src="require(`@/assets/images/ui/${tag}.jpg`)" alt="" />
          </v-avatar>
          {{ tag }}
        </v-chip>
      </v-chip-group>
  
      <!-- 部位 -->
      <v-chip-group v-model="selectPart" active-class="grey darken-4 white--text">
        <div class="d-flex flex-wrap" style="width: 672px">
          <v-chip
            v-for="tag in [
              '头盔',
              '军用眼镜',
              '战术手套',
              '战斗服',
              '背包',
              '弹药补充袋',
              '军靴',
              '称号',
              '饰品',
              '项链',
              '戒指',
              '皮肤',
            ]"
            :key="tag"
            :value="tag"
            class="mb-2 px-2">
            <v-avatar color="primary" size="24" class="mr-1">
              <img :src="require(`@/assets/images/ui/arrmor/${tag}.jpg`)" alt="" />
            </v-avatar>
            {{ tag }}
          </v-chip>
        </div>
      </v-chip-group>
  
 </div>
    <v-card class="pa-5">
      <v-text-field
        v-model="keyword"
        dense
        solo
        color="inital"
        prepend-inner-icon="mdi-magnify"
        hide-details="false"
        placeholder="搜索装备"
        class="mb-4"
        style="font-size: 0.8em"></v-text-field>
      <v-data-table
        dense
        :header-props="{ sortIcon: 'mdi-menu-up' }"
        :headers="headers"
        :items="pagedList"
        :items-per-page="page"
        :custom-sort="customSort"
        hide-default-footer
        mobile-breakpoint>
        <template v-slot:item.name="{ item }">
          <div class="d-flex">
            <div style="display: flex; align-items: center">
              <div
                style="
                  margin-right: 10px;
                  width: 22px;
                  height: 22px;
                  border-radius: 4px;
                  overflow: hidden;
                ">
                <!-- 提示 -->
                <armor-tooltip :item="item" right nudge-bottom="40">
                  <template slot="image">
                    <img
                      style="width: 28px; height: 28px; margin-top: -3px; margin-left: -3px"
                      :src="`${item.image}`"
                      :alt="item.name" />
                  </template>
                </armor-tooltip>
              </div>

              <!-- 名称 -->
              <span class="caption text-no-wrap">{{ item.name }}</span>
            </div>
          </div>
        </template>

        <template v-slot:item.role="{ item }">
          <!-- 角色纸片 -->
          <role-chip :item="item" small />
        </template>

        <template v-slot:item.part="{ item }">
          <!-- 部位纸片 -->
          <part-chip :item="item" small />
        </template>

        <template v-slot:item.defense="{ item }">
          <span v-if="item.defense" class="caption">{{ item.defense }}%</span>
        </template>

        <template v-slot:item.stamina="{ item }">
          <span v-if="item.stamina" class="caption">{{ item.stamina }}%</span>
        </template>

        <template v-slot:item.damageRange="{ item }">
          <span v-if="item.damageRange" class="caption">{{ item.damageRange }}%</span>
        </template>

        <template v-slot:item.moveSpeed="{ item }">
          <span v-if="item.moveSpeed" class="caption">{{ item.moveSpeed }}%</span>
        </template>

        <template v-slot:item.bulletCount="{ item }">
          <span v-if="item.bulletCount" class="caption">+{{ item.bulletCount }}</span>
        </template>
      </v-data-table>

      <div class="text-center pt-4">
        <v-pagination
          color="indigo accent-1"
          v-model="currentPage"
          :length="total"
          :total-visible="5"
          @input="changePage"></v-pagination>
      </div>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import _ from 'lodash';
import armorTooltip from '@/components/armorTooltip/index.vue';
import roleChip from '@/components/armorTooltip/roleChip.vue';
import partChip from '@/components/armorTooltip/partChip.vue';

export default {
  components: { armorTooltip, roleChip, partChip },

  data() {
    return {
      headers: [
        {
          text: '名称',
          value: 'name',
          align: 'start',
          sortable: false,
          divider: false,
          width: '200px',
          class: 'caption',
        },
        {
          text: '角色',
          value: 'role',
          align: 'center',
          filterable: false,
          divider: false,
          width: '80px',
          class: 'caption',
        },
        {
          text: '部位',
          value: 'part',
          align: 'center',
          filterable: false,
          divider: false,
          width: '90px',
          class: 'caption',
        },
        {
          text: '防御力',
          value: 'defense',

          filterable: false,
          divider: false,
          width: '90px',
          class: 'caption',
        },
        {
          text: '体力',
          value: 'stamina',

          filterable: false,
          divider: false,
          width: '90px',
          class: 'caption',
        },
        {
          text: '伤害范围减少',
          value: 'damageRange',

          filterable: false,
          divider: false,
          width: '140px',
          class: 'caption',
        },
        {
          text: '移动速度增加',
          value: 'moveSpeed',

          filterable: false,
          divider: false,
          width: '140px',
          class: 'caption',
        },
        {
          text: '子弹数增加',
          value: 'bulletCount',

          filterable: false,
          divider: false,
          width: '140px',
          class: 'caption',
        },
      ],

      selectRole: '艾利克斯',

      selectPart: '项链',

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

      keyword: '',

      currentPage: 1,

      page: 15,
    };
  },

  computed: {
    ...mapState(['armorList']),

    total() {
      return Math.ceil(this.filterList.length / this.page);
    },

    filterList() {
      let list = [];

      if (!this.selectPart) {
        // 当前角色的所有数据
        list = this.armorList.filter(item => item.role.includes(this.selectRole));
      } else {
        // 当前角色+部位的数据
        list = this.armorList.filter(
          item => item.role.includes(this.selectRole) && item.part.includes(this.selectPart)
        );
      }

      if (this.keyword) {
        return list.filter(item => new RegExp(this.keyword.trim(), 'i').test(item.name));
      }

      return list;
    },

    pagedList() {
      console.log('this.currentPage:', this.currentPage);
      const start = (this.currentPage - 1) * this.page;

      const end = start + this.page;

      const arr = this.filterList.slice(start, end);

      return arr;
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
        return _.sortBy(this.filterList, item => (item[sort] === null ? -Infinity : item[sort]))
          .reverse()
          .slice(start, end);
      } else {
        // 升序+分页
        return _.sortBy(this.filterList, item =>
          item[sort] === null ? Infinity : item[sort]
        ).slice(start, end);
      }
    },

    changePage(newPage) {
      this.currentPage = newPage;
    },
  },

  watch: {
    selectPart() {
      this.currentPage = 1;
    },
    selectRole() {
      this.currentPage = 1;
    },
  },
};
</script>
