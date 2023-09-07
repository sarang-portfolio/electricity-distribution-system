export interface IMeterType {
  id?: number;
  type: string;
  pricePerUnit: number;
  requiredNumberOfReadings: number;
  faultTolerance: number;
}
