export function buildProductFaqs(product) {
  const productName = product?.name ?? "this product";
  const category = product?.category ?? "therapeutic";

  return [
    {
      question: `Can I request quotation for ${productName}?`,
      answer:
        "Yes. Use the Get Quote button on this page or contact form to submit quantity, destination country, and company details for pricing review.",
    },
    {
      question: "Is online checkout available on this website?",
      answer:
        "No. This is a B2B inquiry portal only. Commercial terms, availability, and documentation are shared through direct communication.",
    },
    {
      question: `What information should I share for ${category} products?`,
      answer:
        "Share required strength, dosage form, estimated quantity, target market, and preferred pack type. This helps us provide accurate quotation support.",
    },
    {
      question: "Can I ask for regulatory or technical documents?",
      answer:
        "Yes. Mention your documentation need in the inquiry email and the team will guide based on product and market requirements.",
    },
    {
      question: "How quickly will I get a response?",
      answer:
        "Initial response is usually shared within business timelines after inquiry receipt, followed by quotation discussion based on product scope.",
    },
  ];
}
