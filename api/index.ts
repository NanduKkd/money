import { Router } from 'express'
import transactionsRouter from './transactions'
import structureRouter from './structure'
import { requireAuth } from '../middlewares/auth'

const router = Router();

router.use(requireAuth);
router.use('/transactions', transactionsRouter);
router.use('/structure', structureRouter);

export default router;