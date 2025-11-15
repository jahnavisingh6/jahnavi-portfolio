# EmailJS Setup Guide

Your contact form is now configured to use EmailJS for sending emails directly to **jahnavisingh6@gmail.com**.

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE - no credit card required)
3. Verify your email

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Click **Connect Account** and authorize with your Gmail
5. Copy your **Service ID** (looks like `service_abc1234`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. In the template settings:
   - Set "To Email" to: **jahnavisingh6@gmail.com**
   - Copy your **Template ID** (looks like `template_xyz5678`)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like a long string)

### Step 5: Configure Your Portfolio
1. In your project, copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc1234
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz5678
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Step 6: Test the Contact Form
1. Go to your portfolio: http://localhost:3000
2. Scroll to the contact section
3. Fill out the form and click "Send Message"
4. Check your inbox at **jahnavisingh6@gmail.com**

## Template Variables Reference

Your email template should include these variables:
- `{{from_name}}` - Name from the contact form
- `{{from_email}}` - Email address from the contact form
- `{{message}}` - Message content from the contact form
- `{{to_email}}` - Your email (automatically set to jahnavisingh6@gmail.com)

## Troubleshooting

### Form shows "Failed to send message"
- Check that all three environment variables are set correctly
- Make sure `.env.local` file exists (not `.env.local.example`)
- Restart your development server after adding credentials
- Check browser console for detailed error messages

### Not receiving emails
- Check your spam folder
- Verify "To Email" in EmailJS template is set to **jahnavisingh6@gmail.com**
- Make sure your email service is connected and active in EmailJS dashboard

### Environment variables not working
- Variable names MUST start with `NEXT_PUBLIC_` for Next.js client-side
- File MUST be named `.env.local` (not `.env` or `.env.local.example`)
- Restart development server after any changes to `.env.local`

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ No credit card required
- ✅ Perfect for portfolio sites

## Alternative: Using Web3Forms (Simpler Option)

If you prefer an even simpler setup without EmailJS account:

1. Go to [https://web3forms.com/](https://web3forms.com/)
2. Enter your email: **jahnavisingh6@gmail.com**
3. Get your access key
4. Replace the EmailJS code with Web3Forms integration

Let me know if you need help with this alternative!

## Need Help?

If you run into issues:
1. Check the browser console for error messages
2. Verify all EmailJS credentials are correct
3. Make sure your EmailJS service is active
4. Test email sending from EmailJS dashboard first

---

**Your contact form will work perfectly once you complete these steps!** 🎉
