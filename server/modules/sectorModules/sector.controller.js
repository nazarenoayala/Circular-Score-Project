import sectorDal from "./sector.dal.js";

class SectorController {
    
    //Controlador para traer todos lo sectores
    selectAllSectors = async (req, res) => {
        try {
            let result = await sectorDal.selectAllSectors();
            res.status(200).json({message: 'sectores ok', result: result})
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
    }

    //Controlador para crear nuevo sector
    createSector = async (req, res) => {
        const {sector_name} = req.body;
        let values = [sector_name];

        try {
            let result = await sectorDal.createSector(values);
            res.status(201).json({message: 'sector creado', result})
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    //Controlador para modificar sector
    updateSector = async (req, res) => {
        const {id} = req.params;
        const {sector_name} = req.body;
        let values = [sector_name, id];

        try {
            let result = await sectorDal.updateSector(values);
            res.status(201).json({message: 'sector actualizado', result})
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
    }

    //Controlador para eliminar sector
    deleteSector = async (req, res) => {
        const {id} = req.params;

        try {
            let result = await sectorDal.deleteSector(id);
            res.status(200).json({message: 'sector eliminado', result})
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            
        }
    }
}

export default new SectorController();