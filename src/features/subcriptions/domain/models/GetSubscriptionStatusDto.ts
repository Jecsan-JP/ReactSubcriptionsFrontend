export interface GetSubscriptionStatusDto {
  name: string;
  email: string;
  status: string;
  currentPeriodEnd?: number;
}
