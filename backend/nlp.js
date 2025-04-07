const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"], forceNER: true });
manager.addDocument(
  "en",
  "What's included in the tour package?",
  "user.package"
);
manager.addDocument(
  "en",
  "What happens if I need to cancel or reschedule my tour?",
  "user.tourCancel"
);
manager.addDocument(
  "en",
  "Are there age restrictions for your tours?",
  "user.age"
);
manager.addDocument(
  "en",
  "Is transportation provided during the tour?",
  "user.transportation"
);
manager.addDocument("en", "How do I book a tour?", "user.tourbook");
manager.addDocument("en", "What should I bring on a tour?", "user.bring");
manager.addDocument("en", "Do you offer group discounts?", "user.discounts");
manager.addDocument(
  "en",
  "Are your tours suitable for solo travelers?",
  "user.solo"
);
manager.addDocument("en", "Can I book a private tour?", "user.privateTour");
manager.addDocument(
  "en",
  "What safety measures are in place for the tours?",
  "user.safety"
);

manager.addAnswer(
  "en",
  "user.package",
  "Our tour packages include transportation, guided tours, accommodations, and most meals. Specific inclusions vary by package, so please refer to the details of each tour for more information."
);
manager.addAnswer(
  "en",
  "user.tourCancel",
  "Cancellations and rescheduling are subject to our cancellation policy. Generally, you can cancel or modify your booking up to 48 hours before the tour starts, with a full or partial refund depending on the timing. Please review our cancellation policy for full details."
);
manager.addAnswer(
  "en",
  "user.age",
  "Most of our tours are family-friendly, but certain tours may have age recommendations based on the difficulty of the activities involved. Please check the tour details for age guidelines before booking."
);
manager.addAnswer(
  "en",
  "user.transportation",
  "Yes, transportation is included in the tour price. We provide comfortable buses, coaches, or private vehicles depending on the size and nature of the group."
);
manager.addAnswer(
  "en",
  "user.tourbook",
  "Booking a tour is easy! Simply visit our website, select the tour you're interested in, choose your dates, and complete the online booking form. If you need assistance, you can always reach out to our customer support team."
);
manager.addAnswer(
  "en",
  "user.bring",
  "We recommend packing comfortable clothing, walking shoes, sunscreen, and any personal items you might need for the duration of the tour. Specific packing suggestions will be provided in your booking confirmation email."
);
manager.addAnswer(
  "en",
  "user.discounts",
  "Yes! We offer discounts for groups of 10 or more. Please contact us directly to inquire about group rates and availability."
);
manager.addAnswer(
  "en",
  "user.solo",
  "Absolutely! Our tours are perfect for solo travelers. You'll have the opportunity to meet new people and enjoy the experience in a group setting, with the guidance of our expert tour guides."
);
manager.addAnswer(
  "en",
  "user.privateTour",
  "Yes, we offer private tours for individuals or groups who prefer a more personalized experience. Contact us for pricing and availability."
);
manager.addAnswer(
  "en",
  "user.safety",
  "We prioritize the safety of all our travelers. Our tours adhere to all local health and safety guidelines, and we have taken extra precautions in light of the ongoing health situation. This includes sanitization protocols, safe transportation, and social distancing when possible."
);

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
})();

module.exports = manager;
