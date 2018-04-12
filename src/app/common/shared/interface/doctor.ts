export interface IDoctorsRemarks {
  patientNumber: string,
  message: string,
  doctorName: string,
  timestamp: string,
}

export interface IPatientRemarks {
  doctorNumber: string,
  message: string,
  patientName: string,
  timestamp: string,
}

export interface ISettime {
  duration: string,
  between: string,
}

export interface IDoctorDetails {
  doctorUid: string,
  doctorName: string,
  doctorEmail: string,
  doctorNumber: string,
  doctorPassword: string,
}
