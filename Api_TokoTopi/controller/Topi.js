const topi = require('../model/Topi.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataTopi = (data, gambar) =>
    new Promise(async (resolve, reject) =>{

        const topiBaru = new topi({
            kodeTopi: data.kodeTopi,
            hargaTopi: data.hargaTopi,
            stok: data.stok,
            modelTopi: data.modelTopi,
            gambar: gambar
        })

        await topi.findOne({kodeTopi: data.kodeTopi})
            .then(topi => {
                if (topi){
                    reject (response.commonErrorMsg("Kode Topi Sudah Digunakan"))
                } else {
                    topiBaru.save()
                        .then(r => {
                            resolve(response.commonSuccesMsg('Berhasil Menginput Data'))
                        }).catch(err => {
                            reject (response.commonErrorMsg('Mohon Maaf Gagal Input Data'))
                    })
                }
            }).catch(err => {
                reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.lihatDataTopi = () =>
    new Promise(async (resolve, reject) => {
        await topi.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.lihatDetailDataTopi = (kodeTopi) =>
    new Promise(async (resolve, reject) => {
        await topi.findOne({kodeTopi: kodeTopi})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.updateTopi = (id, data, gambar) =>
    new Promise(async (resolve, reject) =>{
        await topi.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeTopi: data.kodeTopi,
                    hargaTopi: data.hargaTopi,
                    stok: data.stok,
                    modelTopi: data.modelTopi,
                    gambar: gambar
                }
            }
        ) .then(topi => {
            resolve(response.commonSuccesMsg('Berhasil Mengubah Data'))
        }) .catch(err => {
            reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.hapustopi = (_id) =>
    new  Promise(async (resolve, reject) => {
        await topi.remove({_id: ObjectId(_id)})
            .then(() =>{
                resolve(response.commonSuccesMsg('berhasil Menghapus Data'))
            }) .catch(() => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalhan Pada Server Kami'))
            })
    })
