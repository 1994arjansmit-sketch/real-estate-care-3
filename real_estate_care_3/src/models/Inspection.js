// Leesbare labels per rapportagetype, zoals benoemd in de case.
const REPORT_TYPE_LABELS = {
  damageAssessment: 'Schade opnemen',
  maintenanceBacklog: 'Achterstallig onderhoud opnemen',
  technicalInstallationInspection: 'Technische installaties inspecteren',
  modificationInventory: 'Modificaties inventariseren',
}

/**
 * Datamodel voor een inspectierapportage.
 *
 * De case beschrijft vier verschillende soorten rapportages (reportType),
 * elk met hun eigen specifieke velden (vier tot zes key/value pairs).
 * Deze velden staan in `details` en verschillen per reportType:
 *
 * - damageAssessment:               location, isNewDamage, damageType, damageDate,
 *                                    urgentActionRequired, description
 * - maintenanceBacklog:              location, maintenanceType, urgentActionRequired,
 *                                    costEstimate
 * - technicalInstallationInspection: location, installationType, reportedFaults,
 *                                    testProcedureUrl, approved, remarks
 * - modificationInventory:           existingSituationUrl, location, performedBy,
 *                                    description, actionRequired, remarks
 *
 * De velden id, reportType, address, inspectionDate, inspector en status vormen
 * de gemeenschappelijke envelop van elke rapportage (nodig voor de lijst, sortering
 * en API-communicatie), onafhankelijk van het specifieke rapportagetype.
 */
export default class Inspection {
  constructor({ id, reportType, address, inspectionDate, inspector, status, details }) {
    this.id = id
    this.reportType = reportType
    this.address = address
    this.inspectionDate = inspectionDate // ISO 8601, bv. 2025-06-10T09:30:00+02:00
    this.inspector = inspector
    this.status = status
    this.details = details || {}
  }

  /** Datum als JS Date-object, handig voor sorteren en vergelijken. */
  get date() {
    return new Date(this.inspectionDate)
  }

  /** Leesbare Nederlandse datumweergave voor in de UI. */
  get formattedDate() {
    return this.date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  /** Leesbare tijdweergave voor in de UI. */
  get formattedTime() {
    return this.date.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /** Leesbaar label van het rapportagetype, voor gebruik in lijst en detail. */
  get reportTypeLabel() {
    return REPORT_TYPE_LABELS[this.reportType] || this.reportType
  }
}
