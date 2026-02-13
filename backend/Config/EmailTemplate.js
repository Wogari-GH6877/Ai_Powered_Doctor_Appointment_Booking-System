const emailTemplate = `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; color: #1f2937; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f9fafb; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: sans-serif; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background-color: #7375F5; padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .content h2 { color: #111827; font-size: 22px; margin-top: 0; }
        .content p { color: #4b5563; font-size: 16px; margin-bottom: 24px; }
        .button-container { text-align: center; margin: 30px 0; }
        .button { background-color: #7375F5; color: #ffffff !important; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; transition: background-color 0.3s; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #9ca3af; }
        .divider { border-top: 1px solid #e5e7eb; margin: 30px 0; }
        .badge { display: inline-block; background-color: #eeefff; color: #7375F5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div className="wrapper">
        <table className="main">
            <tr>
                <td className="header">
                    <h1>🩺 WakCare</h1>
                </td>
            </tr>
            <tr>
                <td className="content">
                    <div className="badge">WELCOME TO THE FAMILY</div>
                    <h2>Hi there,</h2>
                    <p>We’re thrilled to have you join <strong>WakCare</strong>. You’ve taken the first step toward smarter, easier healthcare management. Our AI assistant is ready to help you find the best doctors and manage your appointments in seconds.</p>
                    
                    <div className="button-container">
                        <a href="https://my-mern-frontend-7wvx.onrender.com/login" className="button">Get Started Now</a>
                    </div>

                    <p><strong>What’s next?</strong><br>
                    • Explore our list of top-rated specialists.<br>
                    • Chat with WakCare AI for instant medical info.<br>
                    • Book your first appointment with ease.</p>

                    <div className="divider"></div>
                    
                    <p style="font-size: 14px; margin-bottom: 0;">If you didn't sign up for this account, you can safely ignore this email.</p>
                </td>
            </tr>
        </table>
        <table style="margin: 0 auto; width: 100%; max-width: 600px;">
            <tr>
                <td className="footer">
                    <p>&copy; 2026 WakCare Inc. | Addis Ababa, Ethiopia</p>
                    <p>Stay healthy, stay happy.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`;

export default emailTemplate;