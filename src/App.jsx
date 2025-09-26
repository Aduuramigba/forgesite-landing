import React, { useState } from "react";
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import { FaXTwitter, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { africanCountryCodes } from "./Countrycode";
import "./App.css";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+234", // Default: Nigeria 🇳🇬
    phone: "",
    industry: "",
    businessSize: "",
    goal: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbzI6n0r7SYPvx2tl5GI76zegJZKH8_9zOPFYAB1OwsbrdsgI9d0fW7hUOD9AvQPgYbedQ/exec";
      
      //Merge phone & countryCode before sending
         const formDataWithFullPhone = {
            ...formData,
          phone: `${formData.countryCode}${formData.phone}`,
          };

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataWithFullPhone),
      });

      setMessage("✅ You're on the waitlist! Check your email for a welcome message.");
      setFormData({
        fullName: "",
        email: "",
        countryCode: "+234",
        phone: "",
        industry: "",
        businessSize: "",
        goal: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="landing-header">
        <h1 className="logo-text">Forgesite</h1>
      </header>

      <main className="landing-main">
        {/* Left Side */}
        <div className="landing-intro">
          <h2>
            Build Websites Effortlessly,{" "}
            <span className="highlight">Powered by AI</span>
          </h2>
          <p>
            Forgesite helps entrepreneurs and teams bring their ideas online in
            minutes. No Code, No Stress. Join our waitlist and be among the
            first to experience it, 50% discount for early access.
          </p>
          <p className="coming-soon">Launching soon 🚀</p>
        </div>

        {/* Right Side */}
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

            

            {/* Country Code + Phone */}
            <div className="phone-group">
             {/* inside your render, map africanCountryCodes */}
<select
  name="countryCode"
  value={formData.countryCode}
  onChange={handleChange}
  required
  className="country-select"
>
  <option value="">Code</option>
  {africanCountryCodes.map(c => (
    <option key={c.code} value={c.code} title={c.label}>
      {c.code}          {/* keep option text short so closed select stays narrow */}
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
              <option value="Entertainment">Entertainment</option>
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
            <button type="submit">Join Now</button>
          </form>
          {message && <p className="form-message">{message}</p>}
        </div>
      </main>

      <footer className="landing-footer">
        © {new Date().getFullYear()} Forgesite. All rights reserved.
        <div className="social-links">
          <a href="https://x.com/Forgesitehq" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61581176770466" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </footer>

      {/* Background Decorations */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  );
}

