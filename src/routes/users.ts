import express from 'express'
import { UsersRepository } from "../repository";

const router = express.Router()

router.post('/', async (req, res) => {
    const user = await UsersRepository.save(req.body.firstName, req.body.lastName, req.body.age)
    res.json({ user })
})

router.get('/', async (req, res) => {
    const users = await UsersRepository.fetch()
    res.json({ users })
})

router.get('/:id', async (req, res) => {
    const user = await UsersRepository.find(parseInt(req.params.id))
    res.json({ user })
})

router.get('/all', async (_, res) => {
    const users = await UsersRepository.paginate()
    res.json({ users })
})

router.post('/delete/:id', async (req, res) => {
    try {
        const user = await UsersRepository.delete(parseInt(req.params.id))
        res.json({ user })
    } catch (error) {
        res.json({ error: error })
    }

})

export default router