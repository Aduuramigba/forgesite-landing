import React, { useState, useEffect, useRef } from "react";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { africanCountryCodes } from "./Countrycode";
import "./App.css";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+234",
    phone: "",
    industry: "",
    businessSize: "",
    goal: "",
  });

  const [message, setMessage] = useState("");
  const recaptchaRef = useRef(null);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState(null);

  // Render reCAPTCHA
  useEffect(() => {
    if (window.grecaptcha && recaptchaRef.current && recaptchaWidgetId === null) {
      const widgetId = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: "6LfZPuArAAAAAAuFCmlHuZf5HpJfD0sL-fCP_k2B", // your site key
      });
      setRecaptchaWidgetId(widgetId);
    }
  }, [recaptchaWidgetId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.grecaptcha?.getResponse(recaptchaWidgetId);
    if (!token) {
      setMessage("⚠️ Please verify you’re human before submitting.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("⚠️ Please enter a valid email address.");
      return;
    }

    // Prevent disposable emails
    const disposableDomains = [
      "mailinator.com",
      "tempmail.com",
      "guerrillamail.com",
      "10minutemail.com",
      "yopmail.com",
    ];
    const domain = formData.email.split("@")[1];
    if (disposableDomains.includes(domain)) {
      setMessage("⚠️ Please use a real email address.");
      return;
    }

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwvz38mkZn028G0u8rRWzEw8u3f6rtUShAlqZXP5792mbGCj43j5YCdLWaubNYZkm0K0Q/exec";

      // URL-encoded form data to avoid CORS preflight
      const urlEncodedData = new URLSearchParams({
        ...formData,
        phone: `${formData.countryCode}${formData.phone}`,
        recaptchaToken: token,
      });

      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncodedData,
      });

      const result = await response.json();

      if (result.status === "success") {
        setMessage(
          "✅ You're on the waitlist! Check your email for a welcome message."
        );
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+234",
          phone: "",
          industry: "",
          businessSize: "",
          goal: "",
        });
        window.grecaptcha?.reset(recaptchaWidgetId);
      } else {
        setMessage(
          `❌ ${result.message || "Something went wrong. Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo-text">Forgesite</h1>
      </header>

      <main className="landing-main">
        <div className="landing-intro">
          <h2>
            Build Websites Effortlessly,{" "}
            <span className="highlight">Powered by AI</span>
          </h2>
          <p>
            Forgesite helps entrepreneurs and teams bring their ideas online in
            minutes. No Code, No Stress. Join our waitlist and be among the
            first to experience it — 50% discount for early access.
          </p>
          <p className="coming-soon">Launching soon 🚀</p>
        </div>

        <div className="form-container">
          <h3>Join the Waitlist</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="phone-group">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
                className="country-select"
              >
                <option value="">Code</option>
                {africanCountryCodes.map((c) => (
                  <option key={c.code} value={c.code} title={c.label}>
                    {c.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="phone-input"
              />
            </div>

            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select Industry</option>
              <option value="tech">Technology</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food</option>
              <option value="real-estate">Real Estate</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>

            <select
              name="businessSize"
              value={formData.businessSize}
              onChange={handleChange}
              required
            >
              <option value="">Business Size</option>
              <option value="solo">Solo</option>
              <option value="small-team">Small Team</option>
              <option value="enterprise">Enterprise</option>
            </select>

            <textarea
              name="goal"
              placeholder="What's your goal?"
              value={formData.goal}
              onChange={handleChange}
            />

            {/* reCAPTCHA */}
            <div ref={recaptchaRef} style={{ marginBottom: "10px" }}></div>

            <button type="submit">Join Now</button>
          </form>
          {message && <p className="form-message">{message}</p>}
        </div>
      </main>

      <footer className="landing-footer">
        © {new Date().getFullYear()} Forgesite. All rights reserved.
        <div className="social-links">
          <a
            href="https://x.com/Forgesitehq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.facebook.com/Forgesite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/company/forgesite-hq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </footer>

      {/* Decorative circles */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  );
}
