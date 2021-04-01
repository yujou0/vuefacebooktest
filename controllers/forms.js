// import md5 from 'md5'
import forms from '../models/forms.js'
import fs from 'fs'

export const create = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    if (req.body.formname.length < 1) {
      res.status(400).send({ success: false, message: '名字必須1個字以上' })
    } else if (req.body.formname.length > 20) {
      res.status(400).send({ success: false, message: '名字必須二十個字以下' })
    } else {
      await forms.create({
        formname: req.body.formname,
        formemail: req.body.formemail,
        formphone: req.body.formphone,
        formaddress: req.body.formaddress,
        formcontent: req.body.formcontent,
        formprice: req.body.formprice,
        formproductname: req.body.formproductname,
        formcartcount: req.body.formcartcount
      })
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const usercheckout = async (req, res) => {
  try {
    const result = await forms.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// export const edit = async (req, res) => {
//   if (req.session.user === undefined) {
//     res.status(401).send({ success: false, message: '未登入' })
//     return
//   }
//   if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
//     res.status(400).send({ success: false, message: '資料格式不符' })
//     return
//   }

//   try {
//     let result = await forms.findById(req.params.id)
//     if (result === null) {
//       res.status(404).send({ success: false, message: '找不到資料' })
//     } else {
//       result = await forms.findByIdAndUpdate(req.params.id, req.body, { new: true })
//       res.status(200).send({ success: true, message: '', result })
//     }
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       res.status(400).send({ success: false, message })
//     } else if (error.name === 'CastError') {
//       res.status(400).send({ success: false, message: 'ID 格式錯誤' })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const deletee = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }

  try {
    let result = await forms.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await forms.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
