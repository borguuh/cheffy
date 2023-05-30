const NewsletterEmail = require("../../models/newsletterEmail");

exports.subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is already subscribed
    const existingEmail = await NewsletterEmail.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already subscribed" });
    }

    // Create a new email subscription
    const newEmail = new NewsletterEmail({ email });
    await newEmail.save();

    return res.status(201).json({ message: "Email subscribed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the newsletter subscription list
    const existingEmail = await NewsletterEmail.findOne({ email });

    if (!existingEmail) {
      return res
        .status(404)
        .json({
          message: "Email not found in the newsletter subscription list.",
        });
    }

    // Remove the email from the newsletter subscription list
    await NewsletterEmail.deleteOne({ email });

    return res
      .status(200)
      .json({ message: "Successfully unsubscribed from the newsletter." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
