import express from 'express';
import {getCollage,postCollage}from '../controllers/collageController.js'
import { postIntern } from '../controllers/internController.js'

const router = express.Router()

// collage
router.get('/functionup/collegeDetails', getCollage)
router.post('/functionup/colleges', postCollage)


// intern
router.post('/functionup/interns',postIntern)



export default router