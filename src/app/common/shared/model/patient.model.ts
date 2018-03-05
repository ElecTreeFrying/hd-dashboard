export class PatientDetails {
  constructor(
    public patientUid: string,
    public patientName: string,
    public patientEmail: string,
    public patientNumber: string,
    public patientPassword: string,
  ) {}
}

export class DataCollection {
  constructor(
    public patientUid: string,
    public sbp: number,
    public dbp: number,
    public hr: number,
    public isHypertensive?: boolean,
    public isAlert?: boolean,
  ) {}
}

export class Settime {
  constructor(
    public patientUid: string,
    public duration: string,
    public between: string,
  ) {}
}

class PatientList {
  constructor(
    public macaddress?: string,
    public patientDetails?: PatientDetails,
    public settime?: Settime,
    public dataCollection?: DataCollection[],
  ) {}
}
