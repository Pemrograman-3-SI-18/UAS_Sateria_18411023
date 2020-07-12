<template>
  <q-page padding class="items-center-justify-center bg-blue-grey" >
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
          <q-btn color="blue" :disable="loading" label="Tambah Data Topi" to="/admin/inputdata" />
          <!-- <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" /> -->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="kodeTopi" :props="props">
              {{ props.row.kodeTopi }}
            </q-td>
            <q-td key="hargaTopi" :props="props">{{ props.row.hargaTopi }}</q-td>
            <q-td key="stok" :props="props">{{ props.row.stok }}</q-td>
            <q-td key="modelTopi" :props="props">{{ props.row.modelTopi }}</q-td>
            <q-td key="gambar" :props="props">
              <q-img :src="baseUrl + props.row.gambar" style="width: 50px; height: 50px"/>
            </q-td>
            <q-td key="action" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn color="teal"
                       dense size="sm"
                       class="q-px-xs"
                       icon="edit"
                       @click="edit(props.row.kodeTopi)"
                       label="Edit"></q-btn>
                <q-btn
                  color="red"
                  dense
                  size="sm"
                  @click="hapusDataTopi(props.row._id)"
                  class="q-px-xs"
                  icon="delete"
                  label="Hapus"></q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: 'http://localhost:2525/gambar/',
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'kodeTopi',
          required: true,
          label: 'Kode Topi',
          align: 'left',
          field: row => row.kodeTopi,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'modelTopi', align: 'center', label: 'Model Topi', field: 'modelTopi', sortable: true },
        { name: 'stok', align: 'center', label: 'Jumlah Stok', field: 'stok', sortable: true },
        { name: 'hargaTopi', align: 'center', label: 'Harga Sepeda', field: 'hargaTopi' },
        { name: 'gambar', label: 'Gambar', align: 'center', field: 'gambar' },
        { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
      ],

      data: []
    }
  },

  methods: {
    // emulate fetching data from server
    getDataTopi () {
      this.$axios.get('/topi/datatopi')
        .then((res) => {
          this.data = res.data.data
        })
    },
    hapusDataTopi (_id) {
      this.$axios.delete('/topi/hapus/' + _id)
        .then((res) => {
          this.$q.notify({
            color: 'positive',
            message: 'Barhasil Menghapus Data'
          })
          this.getDataTopi()
        })
    },
    edit (kodeTopi) {
      this.$router.push('/admin/editdata/' + kodeTopi)
    }
  },
  mounted () {
    this.getDataTopi()
  }
}
</script>
