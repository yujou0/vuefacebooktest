import mongoose from 'mongoose'

const Schema = mongoose.Schema

const formSchema = new Schema(
  {
    formname: {
      type: String,
      minlength: [2, '訂購姓名必須2個字以上'],
      required: '訂購姓名必填'
    },
    formphone: {
      type: Number,
      minlength: [10, '訂購電話必須10個字以上'],
      required: '訂購電話必填'
    },
    formemail: {
      type: String,
      minlength: [5, '訂購信箱必須5個字以上'],
      required: '訂購信箱必填'
    },
    formaddress: {
      type: String,
      minlength: [8, '訂購地址必須8個字以上'],
      required: '訂購地址必填'
    },
    formcontent: {
      type: String,
      // required: '訂購姓名必填'
    },
    formprice: {
      type: String,
      // minlength: [2, '訂購姓名必須2個字以上'],
      // required: '訂購姓名必填'
    },
    formproductname: {
      // type: String,
      // minlength: [2, '訂購姓名必須2個字以上'],
      // required: '訂購姓名必填'
    },
    formcartcount: {
      type: String,
      // minlength: [2, '訂購姓名必須2個字以上'],
      // required: '訂購姓名必填'
    }
  },
  {
    versionKey: false
  }
)

const forms = mongoose.model('forms', formSchema)

export default forms
