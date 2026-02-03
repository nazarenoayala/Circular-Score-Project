import executeQuery from "../../config/db.js";

class SectorDal {
    
    selectAllSectors = async () => {
        try {
            let sql = 'SELECT * FROM sector;'
            let result = await executeQuery(sql);
            return result;
        } catch (error) {
            throw error;
        }
    }

    createSector = async (values) => {
        try {
            let sql = 'INSERT INTO sector (sector_name) VALUES (?);'
            let result = await executeQuery(sql, values);
            return result;
        } catch (error) {
            throw error;
        }
    }

    updateSector = async (values) => {
        try {
            let sql = 'UPDATE sector SET sector_name = ? WHERE sector_id = ?;'
            let result = await executeQuery(sql, values);
            return result;
        } catch (error) {
            throw error
        }
    }

    deleteSector = async (sector_id) => {
        try {
            let sql = 'DELETE FROM sector WHERE sector_id = ?;'
            let result = await executeQuery(sql, [sector_id]);
            return result;
        } catch (error) {
            throw error
        }

}
}
export default new SectorDal();