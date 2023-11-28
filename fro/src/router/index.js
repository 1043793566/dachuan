import { createRouter, createWebHistory } from 'vue-router';
import {useStore} from "@/stores";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            name:'leading',
            component: () => import('@/views/leading.vue'),
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: () => import('@/views/Welcome.vue'),
            children: [
                {
                    path: 'login',
                    name: 'welcome-login',
                    component: () => import('@/components/welcome/LoginPage.vue'),
                },
                {
                    path: 'protocol',
                    name: 'welcome-protocol',
                    component: () => import('@/components/welcome/ProtocolPage.vue'),
                },
                {
                    path: 'registerbyemail',
                    name: 'welcome-register1',
                    component: () => import('@/components/welcome/RegisterByEmail.vue'),
                },
                {
                    path: 'registerbyphone',
                    name: 'welcome-register2',
                    component: () => import('@/components/welcome/RegisterByPhone.vue'),
                },
                {
                    path: 'personaldata',
                    name: 'welcome-personaldata',
                    component: () => import('@/components/welcome/PersonalData.vue'),
                },
                {
                    path: 'personaldata2',
                    name: 'welcome-personaldata2',
                    component: () => import('@/components/welcome/PersonalData2.vue'),
                },
                {
                    path: 'avatar',
                    name: 'welcome-avatar',
                    component: () => import('@/components/welcome/AvatarPage.vue'),
                },
                {
                    path: 'forgetemail',
                    name: 'welcome-forgetemail',
                    component: () => import('@/components/welcome/ForgetEmail.vue'),
                },
                {
                    path: 'forgetphone',
                    name: 'welcome-forgetphone',
                    component: () => import('@/components/welcome/ForgetPhone.vue'),
                },
            ]
        },
        {
            path:'/index',
            name:'index',
            component: () => import('@/views/index.vue'),
        },
        {
            path:'/aboutus',
            name:'aboutus',
            component: () => import('@/views/aboutus.vue'),
        }
    ]
});
router.beforeEach((to, from, next) =>{
    const store = useStore()
    if(store.auth.user != null && to.name.startsWith('welcome-')) {
        next('/index')
    } else if(store.auth.user == null && to.fullPath.startsWith('/index')) {
        next('/welcome/login')
    } else if(to.matched.length === 0){
        next('/index')
    } else {
        next()
    }
})
export default router;


