export class DoctorDetails {
  constructor(
    public doctorUid: string,
    public doctorName: string,
    public doctorEmail: string,
    public doctorNumber: string,
    public doctorPassword: string,
  ) {}
}

class DoctorPatient {
  constructor(
    public patientKey: string
  ) {}
}

export class DoctorRemarks {
  constructor(
    public patientNumber: string,
    public message: string,
    public doctorName: string,
    public timestamp: string,
  ) {}
}


class DoctorList {
  constructor(
    public doctorDetails?: DoctorDetails,
    public doctorPatients?: DoctorPatient[],
    public doctorRemarks?: DoctorRemarks[],
  ) {}
}
