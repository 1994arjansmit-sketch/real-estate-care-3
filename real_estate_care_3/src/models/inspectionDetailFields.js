// Configuratie van de detailvelden per rapportagetype, exact overeenkomstig de
// velden die de case per onderdeel beschrijft. Wordt gebruikt om de 'details'
// van een Inspection generiek en leesbaar te tonen in InspectionDetail.vue.

const BOOLEAN_LABELS = { true: 'Ja', false: 'Nee' }

const DAMAGE_TYPE_LABELS = {
  intentional: 'Moedwillig',
  wearAndTear: 'Slijtage',
  violence: 'Geweld',
  normalUse: 'Normaal gebruik',
  calamity: 'Calamiteit',
  other: 'Anders',
}

const MAINTENANCE_TYPE_LABELS = {
  paintwork: 'Schilderwerk',
  woodRot: 'Houtrot',
  electrical: 'Elektra',
  plumbing: 'Leidingwerk',
  glazing: 'Beglazing',
}

const COST_ESTIMATE_LABELS = {
  '0-500': '€0 - €500',
  '500-1500': '€500 - €1.500',
  '1500+': '€1.500 of meer',
}

const INSTALLATION_TYPE_LABELS = {
  cooling: 'Koeling',
  heating: 'Verwarming',
  ventilation: 'Luchtverversing',
  electrical: 'Elektra',
  security: 'Beveiliging',
}

const PERFORMED_BY_LABELS = {
  tenant: 'Huurder',
  contractor: 'Aannemer',
  unknown: 'Onbekend',
}

const ACTION_REQUIRED_LABELS = {
  accept: 'Accepteren',
  inspect: 'Laten keuren',
  remove: 'Laten verwijderen',
  adjustAndInspect: 'Laten aanpassen en keuren',
}

export const DETAIL_FIELD_CONFIG = {
  damageAssessment: [
    { key: 'location', label: 'Locatie' },
    { key: 'isNewDamage', label: 'Nieuwe schade', type: 'boolean' },
    { key: 'damageType', label: 'Soort schade', type: 'enum', labels: DAMAGE_TYPE_LABELS },
    { key: 'damageDate', label: 'Datum schade', type: 'date' },
    { key: 'urgentActionRequired', label: 'Acute actie vereist', type: 'boolean' },
    { key: 'description', label: 'Omschrijving' },
  ],
  maintenanceBacklog: [
    { key: 'location', label: 'Locatie' },
    { key: 'maintenanceType', label: 'Soort onderhoud', type: 'enum', labels: MAINTENANCE_TYPE_LABELS },
    { key: 'urgentActionRequired', label: 'Acute actie vereist', type: 'boolean' },
    { key: 'costEstimate', label: 'Kostenindicatie', type: 'enum', labels: COST_ESTIMATE_LABELS },
  ],
  technicalInstallationInspection: [
    { key: 'location', label: 'Locatie' },
    { key: 'installationType', label: 'Soort installatie', type: 'enum', labels: INSTALLATION_TYPE_LABELS },
    { key: 'reportedFaults', label: 'Gemelde storingen' },
    { key: 'testProcedureUrl', label: 'Testprocedure', type: 'link' },
    { key: 'approved', label: 'Goedgekeurd', type: 'boolean' },
    { key: 'remarks', label: 'Opmerkingen' },
  ],
  modificationInventory: [
    { key: 'existingSituationUrl', label: 'Bestaande situatie', type: 'link' },
    { key: 'location', label: 'Locatie aangetroffen modificatie' },
    { key: 'performedBy', label: 'Uitgevoerd door', type: 'enum', labels: PERFORMED_BY_LABELS },
    { key: 'description', label: 'Beschrijving modificatie' },
    { key: 'actionRequired', label: 'Te ondernemen actie', type: 'enum', labels: ACTION_REQUIRED_LABELS },
    { key: 'remarks', label: 'Opmerkingen' },
  ],
}

/**
 * Formatteert een ruwe detailwaarde naar leesbare tekst, op basis van het
 * opgegeven veldtype (boolean, enum, date, link of platte tekst).
 */
export function formatDetailValue(value, field) {
  if (value === undefined || value === null || value === '') return '-'

  switch (field.type) {
    case 'boolean':
      return BOOLEAN_LABELS[String(value)] || String(value)
    case 'enum':
      return field.labels?.[value] || value
    case 'date':
      return new Date(value).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    default:
      return value
  }
}
