import express from 'express'
import { createOrUpdate, deleteContactById, getContactById, readAllContacts } from './db.js'

const router = express.Router()

// Leer contactos
router.get('/contacts', async(req, res) => {
    const { success, data } = await readAllContacts()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Obtener contacto por ID
router.get('/contact/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await getContactById(id)
    console.log(data)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Crear contacto
router.post('/contact', async(req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Actualizar contacto por ID
router.put('/contact/:id', async(req, res) => {
    const contact = req.body
    const { id } = req.params
    contact.id = parseInt(id)

    const { success, data } = await createOrUpdate(contact)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Eliminar contacto por ID
router.delete('/contact/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteContactById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})

export default router