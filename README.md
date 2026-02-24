## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## EmailJS Setup (Contact Form)

The contact form in `app/contact/contact-form.js` sends inquiries via EmailJS.

1. Copy `.env.example` to `.env.local`.
2. Add your EmailJS values:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. Restart the dev server after updating environment variables.

### EmailJS template variables used

Configure your EmailJS template to accept these variables:

- `to_email`
- `from_name`
- `company_name`
- `reply_to`
- `email`
- `phone`
- `country`
- `inquiry_type`
- `preferred_contact`
- `subject`
- `message`
- `requirements`

### Auto-reply template variables used

For `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`, configure these variables:

- `to_email`
- `to_name`
- `company_name`
- `inquiry_type`
- `preferred_contact`
- `submitted_subject`
- `support_email`
- `support_phone`
- `website`
- `message`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
