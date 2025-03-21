import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const data = await resend.emails.send({
      from: 'Your Store <onboarding@resend.dev>',
      to: email,
      subject: 'Chào mừng bạn đến với cửa hàng của chúng tôi!',
      html: `
        <h1>Xin chào ${name}!</h1>
        <p>Chúng tôi rất vui mừng khi bạn đã tham gia cùng chúng tôi.</p>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const sendOrderConfirmation = async (
  email: string,
  orderNumber: string,
  items: any[]
) => {
  try {
    const data = await resend.emails.send({
      from: 'Your Store <orders@resend.dev>',
      to: email,
      subject: `Đơn hàng #${orderNumber} đã được xác nhận`,
      html: `
        <h1>Cảm ơn bạn đã đặt hàng!</h1>
        <p>Đơn hàng #${orderNumber} của bạn đã được xác nhận.</p>
        <h2>Chi tiết đơn hàng:</h2>
        <ul>
          ${items.map(item => `
            <li>${item.name} - ${item.quantity} x $${item.price}</li>
          `).join('')}
        </ul>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export const sendPasswordReset = async (email: string, resetToken: string) => {
  try {
    const data = await resend.emails.send({
      from: 'Your Store <security@resend.dev>',
      to: email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      html: `
        <h1>Đặt lại mật khẩu</h1>
        <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link bên dưới để tiếp tục:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}">
          Đặt lại mật khẩu
        </a>
      `
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}; 