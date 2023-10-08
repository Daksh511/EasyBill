import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'

const Inventoryschema = mongoose.Schema({
    name: {
        type : String,
        required : 'Please Enter a valid name'
    },
    qty: {
        type : Number,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    creted_on: {
        type: Date,
        default:Date.now()
    }
});

const inventorymodel = mongoose.model('inventorymodel', Inventoryschema);

router.post('/createitem', async (req,res)=>{
    const invoice = req.body
    const modelpush = inventorymodel(invoice)

    // const InventoryModel = new InventoryModel(invoice)

    try {
        const ifvar = await inventorymodel.findOne({
            name: modelpush.name
        })

        if (!ifvar){
            await modelpush.save()
            res.status(201).json(modelpush) 
        }
        else
        {
            res.send('item of this name is already in inventory')
        }
        
    } catch (error) {
        res.status(409).json(error.message)
    }
})

router.delete('/Deleteitem/:name', async (req,res)=>{
    // const { name:inventoryID } = req.params
    const { name } = req.params
    const ifvar = await inventorymodel.findOne({
        name: name
    })
    try {
        if (ifvar) {
            await inventorymodel.findOneAndDelete({ name:name })
            res.send('deleted')
        }
        else
        {
            res.status(400).send('not found')
        }
        
       // res.send(resp)
    } catch (error) {
        res.status(409).json(error.message)
    }
})

export default router