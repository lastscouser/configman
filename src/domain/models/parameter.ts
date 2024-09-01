export interface Parameter {
  id: string;
  group: string;
  key: string;
  value: string;
  description: string;
  createdAt: Date;
}

export interface ParameterCreationFields {
  group: string;
  key: string;
  value: string;
  description: string;
}

export interface ParameterUpdateFields {
  group?: string;
  value?: string;
  description?: string;
}
