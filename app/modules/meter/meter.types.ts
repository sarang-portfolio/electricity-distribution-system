export interface IMeter {
  id?: number;
  consumerId: number;
  meterTypeId: number;
  meterStatus?: string;
  avgReading?: number;
}
