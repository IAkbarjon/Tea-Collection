import { dataRepository } from "../contexts/DataContext"

// Функция для расчета количества продукции, возможного изготовить из определенного количества материала
/**
 * 
 * @param {number} materialTypeId 
 * @param {number} productTypeId 
 * @param {number} materialCount 
 * @param {number} param1 
 * @param {number} param2 
 * @returns {number} 
 */
export function calculateProductCount(materialTypeId, productTypeId, materialCount, param1, param2) {
    if (!(
        Number.isInteger(materialTypeId) &&
        Number.isInteger(productTypeId) &&
        Number.isFinite(materialCount) &&
        Number.isFinite(param1) &&
        Number.isFinite(param2) &&
        materialTypeId > 0 &&
        productTypeId > 0 &&
        materialCount > 0 &&
        param1 > 0 &&
        param2 > 0
    )) {
        console.log('material type id:', materialTypeId)
        console.log('product type id:', productTypeId)
        console.log('material count:', materialCount)
        console.log('param 1:', param1)
        console.log('param 2:', param2)
        return -1
    }

    const materialType = dataRepository.materialTypes.find(t => t.id === materialTypeId)
    const productType = dataRepository.productTypes.find(t => t.id === productTypeId)

    if (!materialType || !productType) {
        console.log('material type:', materialType)
        console.log('product type:', productType)
        return -1
    }

    const materialsConsumption = param1 * param2 * productType.coefficient
    const usefulMaterialAmount = materialCount * (1 - materialType.losses_percent)
    return Math.floor(usefulMaterialAmount / materialsConsumption)
}
