import React from 'react'

const ContactUs = () => {
  return (
    <div style={{padding:'40px'}}>
        <h1>
            Contact Us
        </h1>
        <h2>We Take Your Feedback Seriously</h2>
      <p>If you have encountered an issue with the app or have a suggestion for improvement, this is the place to let us know.</p>

      <strong>What can you report here?</strong>
      <ul>
        <li>Bugs or technical issues with the app.</li>
        <li>Difficulty using a specific feature.</li>
        <li>Issues with account login or functionality.</li>
        <li>Suggestions for improving the app's design or features.</li>
        <li>Concerns about content moderation or safety.</li>
        <li>Personal attacks or abusive language.</li>
        <li>Spam or irrelevant information.</li>
        <li>Issues requiring immediate technical support (e.g., account lockout).</li>
      </ul>

      <h3>How to Submit a Grievance:</h3>
        <label>
          Briefly describe the issue or suggestion you are experiencing:
        </label>

      <div>
        <p>What happens next?</p>
        <ul>
          <li>We will review your grievance and respond within two business days.</li>
          <li>For technical issues, we will aim to provide a solution or workaround.</li>
          <li>For suggestions, we will consider your feedback for future app updates.</li>
        </ul>
      </div>

      <p>Thank you for helping us make JodiSure a better experience for everyone!</p>
      <p>Learn more about our <a href="https://jodisure.com/privacy">privacy policy</a>.</p>

      <div>
        <p>Contact Us:</p>
        <p>Email: <a href="mailto:admin@jodisure.com">admin@jodisure.com</a></p>
        <p>WhatsApp: 9748548623</p>
        <p>Address: 6 No. Little Russle Street, Kankaria Estates, Park Street area, Kolkata, West Bengal 700071
        </p>
      </div>
    </div>
  )
}

export default ContactUs