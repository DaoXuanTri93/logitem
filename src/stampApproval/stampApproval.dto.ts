


export class StampApprovalDTO {
    stampApprovalId : string
    staff: String
    officeName: string
    driverName: string
    submissionDate: string
    approval: boolean
    approvalDate: String
    stampingBeforeCorrection: string // ngay truoc
    stampingAfterCorrection: string // ngay sau
    reason: string
}