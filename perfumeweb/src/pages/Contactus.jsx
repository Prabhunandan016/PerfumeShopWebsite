import "../styles/Contactus.css";

function Contactus() {
  return (
    <div className="contact-wrapper">

      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We’re here to help you choose your perfect fragrance.</p>
      </div>

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p className="info-text">
            We’d love to hear from you. Whether you have questions about our perfumes, 
            orders, or anything else — our team is ready to assist you.
          </p>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>PerfumeShop, Mumbai, India</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 9391552933</p>
          </div>

          <div className="info-box">
            <h3>✉️ Email</h3>
            <p>prabhunandan016@gmail.com</p>
          </div>

        </div>

        {/* Formspree Form */}
        <form 
          className="contact-form"
          action="https://formspree.io/f/xdkqzwww"
          method="POST"
        >
          <h2>Send a Message</h2>

          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />

          <label>Message</label>
          <textarea name="message" rows="5" placeholder="Write your message here..." required></textarea>

          <button type="submit">Submit</button>
        </form>

      </div>

      <div className="map-section">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contactus;
