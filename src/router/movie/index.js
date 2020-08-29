export default {
    path: '/movie',
    component: () =>
        import ('@/views/Movie'),
    // 二级路由
    children: [{
            path: 'city',
            component: () =>
                import ('@/components/City')
        },
        {
            path: 'commingSoon',
            component: () =>
                import ('@/components/CommingSoon')
        },
        {
            path: 'nowPlaying',
            component: () =>
                import ('@/components/NowPlaying')
        },
        {
            path: 'search',
            component: () =>
                import ('@/components/Search')
        },
        {
            // 输入其他重定向到 nowPlaying
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}