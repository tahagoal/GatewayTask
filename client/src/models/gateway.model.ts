import Device from "./device.model";

export default class GateWay {
  public serial: string;
  public name: string;
  public IP: string;
  devices?: Device[];
  _id?: string;

  constructor(serial: string, name: string, IP: string) {
    this.serial = serial;
    this.name = name;
    this.IP = IP;
  }
}
