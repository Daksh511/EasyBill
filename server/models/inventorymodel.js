import mongoose from 'mongoose'

const Inventoryschema = mongoose.Schema({
    name
});

const InventoryModel = mongoose.model('InventoryModel', Inventoryschema);
export default InventoryModel