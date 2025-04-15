import React, { useState } from "react";
import axios from "axios";
import { FaShareAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./CreateGroupOrder.css"; // if you want to style

const CreateGroupOrder = () => {
  const [groupLink, setGroupLink] = useState("");

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/groupOrder/create");
      const groupId = response.data.groupId;
      const link = `http://localhost:3000/group-order/${groupId}`;
      setGroupLink(link);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappURL = `https://wa.me/?text=Join%20our%20food%20order!%20Click%20here:%20${encodeURIComponent(groupLink)}`;
    window.open(whatsappURL, "_blank");
  };

  const handleEmailShare = () => {
    const subject = "Join Our Group Food Order 🍕";
    const body = `Hey! Click the link below to add your items to our group order:\n\n${groupLink}`;
    const emailURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailURL;
  };

  return (
    <div className="group-order-container">
      <h2>Create a Group Order</h2>
      <button onClick={handleCreateGroup}>Generate Group Order Link</button>

      {groupLink && (
        <div className="group-link-section">
          <p>
            <strong>Group Link:</strong>{" "}
            <a href={groupLink} target="_blank" rel="noreferrer">
              {groupLink}
            </a>
          </p>

          <div className="share-icons">
            <p>
              <FaShareAlt /> Share this link:
            </p>
            <button onClick={handleWhatsAppShare} className="share-btn whatsapp">
              <FaWhatsapp /> WhatsApp
            </button>
            <button onClick={handleEmailShare} className="share-btn email">
              <FaEnvelope /> Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGroupOrder;
