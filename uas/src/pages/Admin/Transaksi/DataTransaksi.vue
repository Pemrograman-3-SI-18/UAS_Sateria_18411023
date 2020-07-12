<template>
  <q-page class="bg-blue-grey" backgroung>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >

        <template v-slot:top>
          <span class="text-h5 text-weight-light q-pa-md">
            <span class="text-blue-grey-14">Data Transaksi</span>
          </span>
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Kode Transaksi',
          align: 'left',
          field: row => row.kodetransaksi,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'user', align: 'center', label: 'User Name', field: 'user', sortable: true },
        { name: 'alamat', align: 'center', label: 'Alamat Antar', field: 'alamat' },
        { name: 'notelp', align: 'center', label: 'No Telepon', field: 'notelp' },
        { name: 'kode', align: 'center', label: 'Kode Topi', field: 'kode', sortable: true },
        { name: 'harga', align: 'center', label: 'Harga Topi', field: 'harga' },
        { name: 'jumlahbeli', align: 'center', label: 'Jumlah Beli', field: 'jumlahbeli' },
        { name: 'total', align: 'center', label: 'Total', field: 'total' },
        { name: 'bayar', align: 'center', label: 'Status Pembayaran', field: 'bayar' },
        { name: 'kirim', align: 'center', label: 'Status Pengirman', field: 'kirim' }
      ],

      data: [
        {
          kodetransaksi: '30001',
          user: 'Seteria',
          alamat: 'Kedaton',
          notelp: '089677094112',
          kode: 'TOP003',
          harga: 'Rp50.000',
          jumlahbeli: '1',
          total: 'Rp50.000',
          bayar: 'Succes',
          kirim: 'Sudah Di Terima'
        },

        {
          kodetransaksi: '30002',
          user: 'Budi',
          alamat: 'Rajabasa',
          notelp: '089677661972',
          kode: 'TOP002',
          harga: 'Rp60.000',
          jumlahbeli: '3',
          total: 'Rp.180.000',
          bayar: 'Succes',
          kirim: 'Sudah Di Terima'
        },

        {
          kodetransaksi: '30003',
          user: 'Sulaiman',
          alamat: 'Way Kandis',
          notelp: '081377972201',
          kode: 'TOP006',
          harga: 'Rp.60.000',
          jumlahbeli: '2',
          total: 'Rp.120.000',
          bayar: 'Succes',
          kirim: 'Dalam Perjalanan'
        },

        {
          kodetransaksi: '30004',
          user: 'Sateria',
          alamat: 'Rajabasa',
          notelp: '089677094112',
          kode: 'TOP004',
          harga: 'Rp35.000',
          jumlahbeli: '3',
          total: 'Rp.105.000',
          bayar: 'Belum Bayar',
          kirim: 'Belum Dikirim'
        }
      ]
    }
  },

  methods: {
    // emulate fetching data from server
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
        this.loading = false
      }, 500)
    },

    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
        this.loading = false
      }, 500)
    }
  }
}
</script>
