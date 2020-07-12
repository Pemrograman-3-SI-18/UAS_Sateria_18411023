<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <q-page padding class="items-center-justify-center bg-blue-grey">
    <q-card flat class="bg-white q-pa-md">
      <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Tambah Data</span>
      </span>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            label="Kode Topi"
            lazy-rules
            color="teal"
            v-model="form.kodeTopi"
            :rules="[
           val => val !== null && val !== '' || 'Kode Topi Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="add_to_photos"/>
            </template>
          </q-input>

          <q-input
            label="Model Topi"
            lazy-rules
            color="teal"
            v-model="form.modelTopi"
            :rules="[
           val => val !== null && val !== '' || 'Model Topi Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="color_lens"/>
            </template>
          </q-input>

          <q-input
            label="Jumlah Stok"
            lazy-rules
            color="teal"
            v-model="form.stok"
            :rules="[
           val => val !== null && val !== '' || 'Jumlah Stok Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="move_to_inbox"/>
            </template>
          </q-input>

          <q-input
            label="Harga Topi"
            lazy-rules
            color="teal"
            v-model="form.hargaTopi"
            :rules="[
           val => val !== null && val !== '' || 'Harga Topi Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="attach_money"/>
            </template>
          </q-input>

          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
            @input="selectFile()"
            color="teal"
            :rules="[
           val => val !== null && val !== '' || 'Gambar Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="add_photo_alternate"/>
            </template>
          </q-input>

          <div>
            <q-btn
              unelevated
              icon="add"
              label="Tambah Data Topi"
              style="height: 50px"
              type="submit"
              color="blue"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        kodeTopi: null,
        modelTopi: null,
        stok: null,
        hargaTopi: null
      },
      gambar: null
    }
  },
  methods: {
    selectFile () {
      this.gambar = this.$refs.file.$refs.input.files[0]
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('gambar', this.gambar)
      formData.append('kodeTopi', this.form.kodeTopi)
      formData.append('hargaTopi', this.form.hargaTopi)
      formData.append('stok', this.form.stok)
      formData.append('modelTopi', this.form.modelTopi)
      this.$axios.post('/topi/input', formData)
        .then((res) => {
          if (res.data.error) {
            this.$q.notify({
              color: 'negative',
              message: res.data.msg,
              icon: 'ion-close'
            })
          } else {
            this.$q.notify({
              color: 'positive',
              message: res.data.msg,
              icon: 'ion-close'
            })
            this.$router.push('/admin')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
