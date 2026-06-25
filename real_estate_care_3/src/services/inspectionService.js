import Inspection from '../models/Inspection'

// my-json-server.typicode.com leest het db.json-bestand op de root van de
// GitHub-repo en biedt op basis daarvan automatisch een REST API aan.
// Pas de gebruikersnaam/repo-naam hieronder aan als jouw GitHub-repo anders heet.
const API_BASE_URL = 'https://my-json-server.typicode.com/1994arjansmit-sketch/realestatecare'

const InspectionService = {
  /**
   * Haalt alle inspecties asynchroon op via een API-call en zet de ruwe
   * JSON-data om naar instanties van het Inspection-datamodel.
   * @returns {Promise<Inspection[]>}
   */
  async getInspections() {
    const response = await fetch(`${API_BASE_URL}/inspections`)

    if (!response.ok) {
      throw new Error(`Kon inspecties niet ophalen (status ${response.status})`)
    }

    const rawData = await response.json()
    return rawData.map((item) => new Inspection(item))
  },
}

export default InspectionService
