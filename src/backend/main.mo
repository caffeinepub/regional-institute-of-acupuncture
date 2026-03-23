import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type Inquiry = {
    name : Text;
    phone : Text;
    email : Text;
    treatmentType : Text;
    preferredDate : Text;
    message : Text;
  };

  type Testimonial = {
    name : Text;
    rating : Nat;
    treatment : Text;
    review : Text;
  };

  module Testimonial {
    public func compare(test1 : Testimonial, test2 : Testimonial) : Order.Order {
      Text.compare(test1.treatment, test2.treatment);
    };
  };

  let inquiries = List.empty<Inquiry>();
  let testimonials = List.empty<Testimonial>();

  public shared ({ caller }) func submitInquiry(inquiry : Inquiry) : async () {
    inquiries.add(inquiry);
  };

  public shared ({ caller }) func submitTestimonial(testimonial : Testimonial) : async () {
    assert (testimonial.rating >= 1 and testimonial.rating <= 5);
    testimonials.add(testimonial);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };
};
