export const createWelcomeEmailTemplate = (name, clientURL) => {
  return `
  <div style="background-color:#0f172a;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:auto;background-color:#111827;border-radius:12px;overflow:hidden;">

      <!-- Header -->
      <div style="padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;font-weight:700;color:#34d399;">
          Luxora
        </h1>
        <p style="margin-top:8px;color:#9ca3af;font-size:14px;letter-spacing:1px;">
          Premium Shopping Experience
        </p>
      </div>

      <!-- Divider -->
      <div style="height:1px;background-color:#1f2937;"></div>

      <!-- Content -->
      <div style="padding:32px;color:#e5e7eb;">
        <h2 style="font-size:22px;font-weight:600;margin-bottom:12px;">
          Welcome${name ? `, ${name}` : ""}! 👋
        </h2>

        <p style="font-size:15px;line-height:1.6;color:#d1d5db;">
          We're excited to have you at <strong style="color:#34d399;">Luxora</strong>.
          Discover premium products, seamless shopping, and powerful tools designed
          to give you the best e-commerce experience.
        </p>

        <ul style="margin:20px 0;padding-left:20px;color:#9ca3af;font-size:14px;">
          <li>🛍 Curated premium products</li>
          <li>⚡ Fast & secure checkout</li>
          <li>📊 Smart analytics & management</li>
        </ul>

        <!-- CTA -->
        <div style="text-align:center;margin-top:32px;">
          <a href="${clientURL}"
            style="
              background-color:#10b981;
              color:#ffffff;
              text-decoration:none;
              padding:14px 28px;
              border-radius:8px;
              font-size:15px;
              font-weight:600;
              display:inline-block;
            ">
            Visit Luxora
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color:#020617;padding:20px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#6b7280;">
          © ${new Date().getFullYear()} Luxora. All rights reserved.
        </p>
        <p style="margin-top:6px;font-size:12px;color:#6b7280;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>

    </div>
  </div>
  `;
};
