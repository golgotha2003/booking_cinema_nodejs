const createOtpSession = async (email, session) => {
    const otp = generateOtp();

    session.otp = {
        email: email,
        code: otp,
        expiredAt: Date.now() + 300000, // 5 minutes
    };

    const isSent = await sendEmail(email, otp);

    if (!isSent) {
        throw new Error({ error: "Failed to send email" });
    }
};

module.exports = { createOtpSession };