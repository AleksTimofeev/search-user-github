export enum RequestStatus {
  IDLE= 'idle',
  LOADING= 'loading',
  FAILED='failed',
  SUCCEEDED='succeeded'
}

export type RequestStatusType = 'idle' | 'loading' | 'failed' | 'succeeded'