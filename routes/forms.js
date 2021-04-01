import express from 'express'
import { create } from '../controllers/forms.js'

const router = express.Router()

router.post('/', create)
// router.patch('/:id', edit)
// router.delete('/:id',deletee)
// router.get('/checkoutlist', usercheckout)

export default router
