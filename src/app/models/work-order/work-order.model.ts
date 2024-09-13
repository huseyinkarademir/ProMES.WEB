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
  downtimeDurations?: { [key: string]: DowntimeDuration };
  totalDowntimeDuration: number;
}

export interface WorkOrderListModel {
  workOrderList: WorkOrderModel[]
}

export interface WorkOrderQueryRequest {}