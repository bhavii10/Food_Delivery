// import { useState } from "react";


// const EmailForm = () => {
//   const [emailData, setEmailData] = useState({
//     to: "",
//     subject: "",
//     text: "",
//   });

//   const handleChange = (e) => {
//     setEmailData({ ...emailData, [e.target.name]: e.target.value });
//   };

//   const sendEmail = async () => {
//     try {
//       const response = await fetch("http://localhost:2501/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(emailData),
//       });

//       const data = await response.json();
//       alert(data.message || data.error);
//     } catch (error) {
//       console.error("❌ Error sending email:", error);
//       alert("Failed to send email. Check console for details.");
//     }
//   };

//   return (
//     <div>
//       <h2>Contact Us</h2>
//       <input type="email" name="to" placeholder="Recipient Email" onChange={handleChange} />
//       <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
//       <textarea name="text" placeholder="Message" onChange={handleChange}></textarea>
//       <button onClick={sendEmail}>Send Email</button>
//     </div>
//   );
// };

// export default EmailForm;























































import { useState } from "react";
import "./EmailForm.css";

const EmailForm = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    try {
      const response = await fetch("http://localhost:2501/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      alert(data.message || data.error);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      alert("Failed to send email. Check console for details.");
    }
  };

  return (
    <div className="email-form-container">
      <h2>Contact Us</h2>
      <input type="email" name="to" placeholder="Recipient Email" onChange={handleChange} />
      <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
      <textarea name="text" placeholder="Message" onChange={handleChange}></textarea>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailForm;