<template>
  <div>
    <!-- 导航 -->
    <v-navigation-drawer app fixed width="200" v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">AOW</v-list-item-title>
          <!-- <v-list-item-subtitle>subtext</v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 应用栏 -->
    <v-app-bar app dense color="#fff" class="elevation-2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold text--secondary px-2">
        {{ $route.meta.title }}
      </v-toolbar-title>
    </v-app-bar>

    <!-- 内容 -->
    <v-main>
      <v-container class="py-8 px-16" fluid>
        <h5 class="text-h5 mb-3">{{ $route.meta.title }}</h5>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'Layout',

  data() {
    return {
      items: [
        { title: '武器', icon: 'mdi-sword', to: '/weapon' },
        { title: '防具', icon: 'mdi-shield-sword', to: '/armor' },
        { title: '强化', icon: 'mdi-chart-box', to: '/upgrade' },
        { title: '配装', icon: 'mdi-cube', to: '/simulation' },
      ],
      right: null,
      drawer: null,
    };
  },
};
</script>
