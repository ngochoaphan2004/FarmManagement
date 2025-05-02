export type CreateDeviceDto = {
  deviceName: string;
  action: "view" | "trigger";
  qrCode?: string;
  status: "active" | "inactive" | "maintenance";
  userId: string;
  type: "light" | "soil" | "air" | "pump";
};
