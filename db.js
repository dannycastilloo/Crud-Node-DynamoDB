import {db, Table} from './db.config.js'

// Crear o actualizar estudiantes
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: Table,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Leer todos los estudiantes
const readAllEstudiantes = async()=>{
    const params = {
        TableName: Table
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Leer Estudiante por ID
const getEstudianteById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Eliminar Estudiante by ID
const deleteEstudianteById = async(value, key = 'id' ) => { 
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}


export {
    createOrUpdate,
    readAllEstudiantes,
    getEstudianteById,
    deleteEstudianteById
}