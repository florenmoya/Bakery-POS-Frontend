<template>
    <v-app id="inspire" oncontextmenu="return false;">
        <template v-if="loggedIn">
            <v-navigation-drawer class="d-print-none" v-model="drawer" app clipped>
                <v-list dense>
                    <v-list-item @click="" v-for="item in menuItems" :key="item.title" :to="item.path">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar class="d-print-none" app clipped-left>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>{{this.$route.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <span class="mr-2">{{ loggedUser }}</span>
                            <v-icon>mdi-account</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(bar_userMenu, i) in bar_userMenu" :key="i">
                            <v-list-item-title>
                                <v-btn text :to="bar_userMenu.path">
                                    {{ bar_userMenu.title }}
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
        </template>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer class="d-print-none" app>
            <span>&copy; Moya's Bakery</span>
        </v-footer>
    </v-app>
</template>
<script>
import Login from './components/Auth/Login'
import Router from 'vue-router'

export default {

    components: {
        Login
    },
    data() {
        return {
            bar_userMenu: [
                { title: 'Logout', path: '/logout', icon: 'home' }
            ],
            drawer: true,
            appTitle: 'Awesome App',
            sidebar: false,
            items: [{
                    text: 'Dashboard',
                    disabled: false,
                    href: 'breadcrumbs_dashboard'
                },
                {
                    text: 'Link 1',
                    disabled: false,
                    href: 'breadcrumbs_link_1'
                },
                {
                    text: 'Link 2',
                    disabled: true,
                    href: 'breadcrumbs_link_2'
                }
            ],
        }
    },
    props: {
        source: String
    },
    created() {
        this.$vuetify.theme.light = true
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        loggedUser() {
            return this.$store.getters.loggedUser
        },
        menuItems() {
            if (this.loggedUser == 'kyawkyaw' || this.loggedUser == 'kyawkyawsr') {
                return [
                    { title: 'Home', path: '/', icon: 'home' },
                    { title: 'Sales', path: '/sales', icon: 'money' },
                    { title: 'Inventory', path: '/inventory', icon: 'inventory' },
                    { title: 'Reports', path: '/reports', icon: 'report' },
                    { title: 'Settings', path: '/settings', icon: 'settings' }
                ]
            } else {
                return [
                    { title: 'Sales', path: '/sales', icon: 'money' },
                    { title: 'Inventory', path: '/inventory', icon: 'inventory' },
                ]
            }
        }

    }
}

</script>
