import express from 'express'
import { getJobs,postJobs,deleteJobs,updateJob,getJobsNoAuth } from '../controllers/jobs.js'
import { auth } from '../middleware/auth.js'
const router = express.Router()

router.post('/',auth, postJobs)
router.get('/',auth, getJobs)
router.get('/def', getJobsNoAuth)
router.delete('/:id',auth, deleteJobs)
router.patch('/:id',auth, updateJob)

export default router

