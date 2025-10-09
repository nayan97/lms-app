<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
    <div style="max-width: 600px; background: #fff; padding: 20px; border-radius: 8px;">
        <h2>Hello {{ $name ?? 'User' }},</h2>
        <p>You requested to reset your password.</p>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="text-align:center; color:#2563eb;">{{ $otp }}</h1>
        <p>This code will expire in 5 minutes.</p>
        <p>Thank you,<br><strong>Your App Team</strong></p>
    </div>
</body>
</html>
