import { Client, ID, TablesDB } from 'appwrite'

export interface ResearchSubmissionDocument {
  schemaVersion: '1.0'
  consentVersion: string
  imageId: string
  modelId: string
  modelRevision: string
  controlScore: number
  adScore: number
  resultBand: 'control-like' | 'mixed' | 'ad-like'
  recordingDurationMs: number
  browserFamily: 'Chrome' | 'Safari' | 'Firefox' | 'Edge' | 'Other'
  submittedAt: string
  age?: number
  gender?: string
}

interface ResearchSubmissionConfig {
  endpoint: string
  projectId: string
  databaseId: string
  tableId: string
}

export class ResearchSubmissionConfigurationError extends Error {
  constructor() {
    super('Research submission is not configured in this environment.')
    this.name = 'ResearchSubmissionConfigurationError'
  }
}

const researchSubmissionConfig: ResearchSubmissionConfig = {
  endpoint: getEnvString('VITE_APPWRITE_ENDPOINT'),
  projectId: getEnvString('VITE_APPWRITE_PROJECT_ID'),
  databaseId: getEnvString('VITE_APPWRITE_DATABASE_ID'),
  tableId: getEnvString('VITE_APPWRITE_RESEARCH_COLLECTION_ID'),
}

let researchTables: TablesDB | null = null

export async function submitResearchSubmission(data: ResearchSubmissionDocument): Promise<void> {
  await getResearchTables().createRow({
    databaseId: researchSubmissionConfig.databaseId,
    tableId: researchSubmissionConfig.tableId,
    rowId: ID.unique(),
    data,
    permissions: [],
  })
}

function getResearchTables(): TablesDB {
  if (!isResearchSubmissionConfigured()) {
    throw new ResearchSubmissionConfigurationError()
  }

  if (!researchTables) {
    const client = new Client()
      .setEndpoint(researchSubmissionConfig.endpoint)
      .setProject(researchSubmissionConfig.projectId)

    researchTables = new TablesDB(client)
  }

  return researchTables
}

function isResearchSubmissionConfigured(): boolean {
  return Object.values(researchSubmissionConfig).every(Boolean)
}

function getEnvString(key: string): string {
  const value = import.meta.env[key]
  return typeof value === 'string' ? value.trim() : ''
}
