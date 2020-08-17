export interface Partner {
  _id?: String;
  name?: string;
  technical_manager?: string;
  phone?: string;
  email?: string;
  password?: string;
  counter?: number;
  cnpj?: string;
  config?: {
    permissions?: number;
    register_page?: boolean;
    register_plan?: boolean;
    set_configuration_data?: boolean;
    manage_modules?: boolean;
  };
}
