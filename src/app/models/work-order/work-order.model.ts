// export interface Downtime {
//     id: number;
//     downtimeName: string;
//     downtimeType: number;
//     downtimeDuration: number;
//     workOrderNo: number;
// }

// export interface WorkOrder {
//     workOrderNo: number;
//     downtimes: Downtime[];
//     totalDowntimeDuration: number
// }

export interface DowntimeDuration {
    reasonType: number;
    reason: string;
    totalDuration: number;
  }
  
  export interface WorkOrderModel {
    id: number;
    workOrderNo: number;
    machineId: number;
    startTime: string;
    endTime: string;
    downtimeDurations: { [key: string]: DowntimeDuration };
    totalDowntimeDuration: number;
  }

export interface WorkOrderQueryRequest {}