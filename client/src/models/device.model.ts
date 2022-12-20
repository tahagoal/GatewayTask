import { Status } from "../enums/status.enum";

export default class Device {
  public uid?: number;
  public vendor: string;
  public gatewayId: string;
  public date?: Date;
  public _id?: string;
  public status: Status;
  
  constructor(vendor: string, gatewayId: string, status: Status) {
    this.vendor = vendor;
    this.gatewayId = gatewayId;
    this.status = status;
  }
}
