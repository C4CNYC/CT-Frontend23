// ----------------------------------------------------------------------

export interface IInvoiceAddress {
  id: string;
  name: string;
  address: string;
  company: string;
  email: string;
  phone: string;
}

export interface IInvoiceItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  service: string;
}

export interface IInvoice {
  id: string;
  sent: number;
  status: string;
  totalPrice: number;
  invoiceNumber: string;
  subTotalPrice: number;
  taxes: number | string;
  discount: number | string;
  invoiceFrom: IInvoiceAddress;
  invoiceTo: IInvoiceAddress;
  createDate: Date | number;
  dueDate: Date | number;
  items: IInvoiceItem[];
}
