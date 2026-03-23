import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    preferredDate: string;
    phone: string;
    treatmentType: string;
}
export interface Testimonial {
    review: string;
    name: string;
    treatment: string;
    rating: bigint;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    submitInquiry(inquiry: Inquiry): Promise<void>;
    submitTestimonial(testimonial: Testimonial): Promise<void>;
}
