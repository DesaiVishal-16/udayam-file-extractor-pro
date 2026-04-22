
export interface TableData {
  tableName: string;
  headers: string[];
  rows: string[][];
}

export interface ExtractionResult {
  tables: TableData[];
  summary: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
