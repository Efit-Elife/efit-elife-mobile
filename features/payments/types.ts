import { PaymentMethod } from "@/types/payment";
import { PaymentIntent } from "@stripe/stripe-react-native";

export interface PaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
}

export interface AddPaymentMethodRequest {
  paymentMethodId: string;
  setAsDefault?: boolean;
}

export interface DeletePaymentMethodRequest {
  paymentMethodId: string;
}

export interface SetDefaultPaymentMethodRequest {
  paymentMethodId: string;
}

export interface CheckoutInfoResponse {
  items: {
    id: string;
    designId: string;
    designName: string;
    name: string;
    color: string;
    total: number;
  }[];
  totalAmount: number;
  hasPaymentMethods: boolean;
  defaultPaymentMethod: PaymentMethod | null;
}

export interface ShippingAddress {
  name: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  method?: "standard" | "express";
  cost?: number;
}

export interface ProcessCheckoutRequest {
  paymentMethodId?: string;
  savePaymentMethod?: boolean;
  paymentIntent?: string;
  itemIds?: string[];
  return_url?: string;
  shipping?: ShippingAddress;
}

export interface ProcessCheckoutResponse {
  success: boolean;
  clientSecret: string | null;
  paymentIntentId: string;
  requiresAction: boolean;
  orderId?: string;
  status: PaymentIntent.Status;
}
