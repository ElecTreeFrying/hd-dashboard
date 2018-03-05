export interface IPatientDetails {
  patientUid: string,
  patientName: string,
  patientEmail: string,
  patientNumber: string,
  patientPassword: string,
}

export interface IDataCollection {
  patientUid: string,
  sbp: number,
  dbp: number,
  hr: number,
  isHypertensive?: boolean,
  isAlert?: boolean,
}

export interface ISettime {
  patientUid: string,
  duration: string,
  between: string,
}
