import Inspection from '../models/Inspection'

const API_BASE_URL = 'https://my-json-server.typicode.com/1994arjansmit-sketch/real-estate-care-3'

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
