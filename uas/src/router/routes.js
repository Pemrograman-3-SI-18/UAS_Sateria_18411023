
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      autentikasi: true
    },
    children: [
      { path: '', component: () => import('pages/Admin/Home/DataTopi.vue') },
      { path: 'inputdata', component: () => import('pages/Admin/Home/InputData.vue') },
      { path: 'editdata/:kodeTopi', component: () => import('pages/Admin/Home/EditData.vue') },
      { path: 'datatransaksi', component: () => import('pages/Admin/Transaksi/DataTransaksi.vue') }
    ]
  },
  {
    path: '/pembeli',
    component: () => import('layouts/PembeliLayout.vue'),
    meta: {
      autentikasi: true
    },
    children: [
      { path: '', component: () => import('pages/Pembeli/DataBarang/DataTopi.vue') },
      { path: 'transaksi', component: () => import('pages/Pembeli/Transaksi/DataTransaksi.vue') },
      { path: 'pembayaran', component: () => import('pages/Pembeli/Transaksi/Pembayaran.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginRegistLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users/Login.vue') },
      { path: 'auth/Registrasi', component: () => import('pages/Users/Registrasi.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
