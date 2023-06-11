import express from 'express'
import { createOrUpdate, deleteEstudianteById, getEstudianteById, readAllEstudiantes } from './db.js'

const router = express.Router()

// Leer estudiantes
router.get('/estudiantes', async(req, res) => {
    const { success, data } = await readAllEstudiantes()

    if(success){
        return res.json({success, data})
    }
    return res.status(500).json({success:false, messsage: "Error"})
})

// Obtener estudiante por ID
router.get('/estudiante/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await getEstudianteById(id)
    console.log(data)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Crear estudiante
router.post('/estudiante', async(req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: 'Error'})
})


// Actualizar estudiante por ID
router.put('/estudiante/:id', async(req, res) => {
    const estudiante = req.body
    const { id } = req.params
    estudiante.id = parseInt(id)

    const { success, data } = await createOrUpdate(estudiante)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})

// Eliminar estudiante por ID
router.delete('/estudiante/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteEstudianteById(id)
    if (success) {
      return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error'})
})

export default router