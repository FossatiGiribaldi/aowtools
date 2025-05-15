<template>
  <div style="width: 520px">
    <h2 class="mb-3">方案</h2>
    <div class="d-flex justify-space-between">
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

            <img v-if="item === '柯莉儿'" :src="require('@/assets/images/ui/柯莉儿.jpg')" alt="" />

            <img v-if="item === '布莱克'" :src="require('@/assets/images/ui/布莱克.jpg')" alt="" />

            <img v-if="item === '比比'" :src="require('@/assets/images/ui/比比.jpg')" alt="" />
          </v-avatar>

          <span style="font-size: 0.9em">{{ item }}</span>
        </template>
      </v-select>

      <div class="d-flex">
        <v-select
          v-model="attribute"
          :items="[
            { text: '防御力', value: 'defense' },
            { text: '体力', value: 'stamina' },
            { text: '伤害范围减少', value: 'damageRange' },
            { text: '移动速度', value: 'moveSpeed' },
          ]"
          :menu-props="{ offsetY: true }"
          @change="sortAttribute"
          dense
          solo
          flat
          hide-details="false"
          style="max-width: 150px; margin-right: 10px">
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
      </div>
    </div>

    <div class="d-flex justify-end">
      <!-- 导出 -->
      <v-btn small depressed @click="exportJSON" class="mr-4 indigo accent-1 white--text">
        <v-icon style="transform: rotate(180deg)">mdi-import</v-icon>
        导出JSON文件
      </v-btn>

      <!-- 导入 -->
      <v-btn depressed small @click="triggerFileInput" class="indigo accent-1 white--text">
        <v-icon>mdi-import</v-icon>
        导入JSON文件
      </v-btn>
    </div>

    <v-file-input
      ref="fileInput"
      accept="application/json"
      @change="importJSON"
      style="display: none"></v-file-input>

    <v-list-item
      three-line
      v-for="(scheme, index) in list"
      :key="index"
      class="my-4 rounded-sm"
      style="display: flex; align-items: start; background-color: #fff; cursor: pointer">
      <v-list-item-content>
        <v-list-item-title class="d-flex align-center mb-1" @click="edit(scheme)">
          <v-chip label color="indigo accent-1 lighten-2" text-color="white" x-small class="mr-1">
            {{ index + 1 }}
          </v-chip>
          <span class="font-weight-medium subtitle-2">
            {{ scheme.schemeTitle }}
          </span>
        </v-list-item-title>

        <div class="d-flex align-center pa-2">
          <!-- <v-avatar size="28">
            <img :src="require(`@/assets/images/ui/${scheme.schemeRole}.jpg`)" alt="" />
          </v-avatar>

          <v-divider vertical class="mx-4"></v-divider> -->

          <div>
            <div class="d-flex mb-2 mr-5">
              <div v-for="(part, index) in scheme.parts" :key="index" class="mr-1">
                <div style="border-radius: 4px; overflow: hidden; width: 26px; height: 26px">
                  <armor-tooltip :item="part" :disabled="!part.name" top>
                    <template slot="image">
                      <img style="margin: -3px -3px" :src="part?.image" alt="" srcset="" />
                    </template>
                  </armor-tooltip>
                </div>
              </div>
            </div>

            <!-- 属性统计 -->
            <div class="d-flex">
              <v-chip small label outlined color="blue-grey accent-2" class="mr-2">
                <div>防御力</div>
                {{
                  scheme.parts.reduce((total, currentValue) => {
                    return new Big(total).plus(+currentValue.defense).toNumber();
                  }, 0)
                }}%
              </v-chip>

              <v-chip small label outlined color="blue-grey accent-2" class="mr-2">
                <div>体力</div>
                {{
                  scheme.parts.reduce((total, currentValue) => {
                    return new Big(total).plus(+currentValue.stamina).toNumber();
                  }, 0)
                }}%
              </v-chip>

              <v-chip small label outlined color="blue-grey accent-2" class="mr-2">
                <div>伤害范围减少</div>

                {{
                  scheme.parts.reduce((total, currentValue) => {
                    return new Big(total).plus(+currentValue.damageRange).toNumber();
                  }, 0)
                }}%
              </v-chip>

              <v-chip small label outlined color="blue-grey accent-2" class="mr-2">
                <div>移动速度增加</div>

                {{
                  scheme.parts.reduce((total, currentValue) => {
                    return new Big(total).plus(+currentValue.moveSpeed).toNumber();
                  }, 0)
                }}%
              </v-chip>
            </div>
          </div>

          <!-- 删除 -->
          <v-btn icon color="pink lighten-2" @click="del(scheme)">
            <v-icon dense>mdi-delete</v-icon>
          </v-btn>

          <!-- 分享 -->
          <v-btn icon color="pink lighten-2" @click="share(scheme)">
            <v-icon dense>mdi-share</v-icon>
          </v-btn>
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-dialog v-model="dialog" width="500" transition="slide-y-transition">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">分享</v-card-title>
      <span class="caption">  {{ msg }}</span>
        <v-btn @click="copy"><v-icon>mdi-content-copy</v-icon></v-btn>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Big from 'big.js';
import { mapState } from 'vuex';
import armorTooltip from '@/components/armorTooltip/index.vue';
import _ from 'lodash';
import FileSaver from 'file-saver';

export default {
  components: { armorTooltip },
  data() {
    return {
      list: [],

      Big,

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

      selectRole: '艾利克斯',

      attribute: 'moveSpeed',

      sort: '默认',

      dialog: false,

      msg: 'lorem',
    };
  },

  computed: {
    ...mapState(['armorList']),

    ...mapState(['schemeList']),

    schemeMapList() {
      return this.schemeList.map(scheme => {
        let parts = scheme.parts.map((part, i) => {
          const res = this.armorList.find(item => item.id === part.id);
          return res || this.parts[i];
        });

        let defense = parts.reduce((total, currentValue) => {
          return new Big(total).plus(+currentValue.defense).toNumber();
        }, 0);

        let stamina = parts.reduce((total, currentValue) => {
          return new Big(total).plus(+currentValue.stamina).toNumber();
        }, 0);

        let damageRange = parts.reduce((total, currentValue) => {
          return new Big(total).plus(+currentValue.damageRange).toNumber();
        }, 0);

        let moveSpeed = parts.reduce((total, currentValue) => {
          return new Big(total).plus(+currentValue.moveSpeed).toNumber();
        }, 0);

        return {
          schemeTitle: scheme.schemeTitle,
          schemeRole: scheme.schemeRole,
          parts,
          id: scheme.id,
          defense,
          stamina,
          damageRange,
          moveSpeed,
        };
      });
    },

    schemeFilterMapList() {
      return this.schemeMapList.filter(item => item.schemeRole.includes(this.selectRole));
    },
  },

  mounted() {
    const { selectRole } = this.$route.params;

    if (selectRole) {
      this.selectRole = selectRole;
    }

    this.list = this.schemeFilterMapList;
  },

  methods: {
    edit(scheme) {
      this.$router.go(-1);
      this.$store.commit('UPDATE_SCHEME', scheme);
    },

    del(scheme) {
      this.$store.commit('DELETE_SCHEMELIST', scheme.id);
      this.list = this.schemeMapList;
    },

    share(scheme) {
      this.dialog = true;

      this.msg = scheme.parts.map(part => part.id).join('_');
    },

    async copy() {
      const res = await navigator.clipboard.writeText(this.msg).catch(err => err);
      if (res) return console.log('复制失败：', err);

      alert('复制成功');
    },

    filterRole() {
      this.list = this.schemeMapList.filter(item => item.schemeRole === this.selectRole);
    },

    sortAttribute() {
      if (this.sort === '默认') return (this.list = this.schemeFilterMapList);

      if (this.sort === '升序') {
        this.list = _.sortBy(this.schemeFilterMapList, item => {
          return item[this.attribute] === null ? Infinity : item[this.attribute];
        });
      } else {
        this.list = _.sortBy(this.schemeFilterMapList, item => {
          return item[this.attribute] === null ? Infinity : item[this.attribute];
        }).reverse();
      }
    },

    exportJSON() {
      // 将JSON对象转换为字符串，并格式化（可选）
      const jsonString = JSON.stringify(this.schemeList, null, 2);

      // 创建Blob对象，指定文件类型为JSON
      const blob = new Blob([jsonString], { type: 'application/json' });

      // 使用FileSaver保存文件，指定文件名
      FileSaver.saveAs(blob, 'data.json');
    },

    importJSON(file) {
      // 检查文件是否为空
      if (!file) return;

      // 检查文件类型是否为JSON
      if (file.type !== 'application/json') {
        console.log('请选择JSON文件');
        return;
      }

      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        this.$store.commit('IMPORT_SCHEMELIST', JSON.parse(reader.result));
      };
    },

    triggerFileInput() {
      this.$refs.fileInput.$el.querySelector('input').click();
    },
  },
};
</script>
