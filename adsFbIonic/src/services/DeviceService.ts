import { Device } from 'ionic-native';

export class DeviceService {  
  
    deviceUUID: any;
    constructor() {
        this.deviceUUID = Device.uuid;
    }
    getDeviceUUID(){
        return this.deviceUUID ? this.deviceUUID : 'AAAAAA-AAAAAA';
    }
}