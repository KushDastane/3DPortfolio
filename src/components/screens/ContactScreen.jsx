import { useState } from "react";
import emailjs from "@emailjs/browser";
import CRTScreen from "../CRTScreen";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function ContactScreen() {
  const [status, setStatus] = useState("IDLE");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("SENDING");

    emailjs
      .send(
        "service_b975r8v",
        "template_ykzmy4c",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "xFLspg7cIcxfDEKsJ"
      )
      .then(
        () => {
          setStatus("SENT");
          setTimeout(() => {
            setFormData({ name: "", email: "", message: "" });
            setStatus("IDLE");
          }, 3500);
        },
        () => {
          setStatus("ERROR");
          setTimeout(() => setStatus("IDLE"), 3500);
        }
      );
  }

  return (
    <CRTScreen>
      {/* SCREEN WRAPPER */}
      <div className="w-full flex justify-center px-4 py-10">
        {/* CONTENT SHELL */}
        <div className="w-full max-w-md md:border-3 border-gray-900 sm:crt-frame sm:p-6 p-4 flex flex-col">
          {/* ───────── TOP BAR ───────── */}
          <div className="flex justify-between text-[11px] pb-2 mb-4 border-b border-black/70 tracking-wider">
            <span>SYSTEM_ROOT // CONTACT</span>
            <span>NET: ONLINE</span>
          </div>

          {/* ───────── TITLE ───────── */}
          <h1 className="text-sm font-bold tracking-[0.25em] text-center mb-1">
            CONTACT.sys
          </h1>
          <p className="text-[10px] text-center opacity-70 mb-4">
            MESSAGE_TRANSMISSION_INTERFACE
          </p>

          {/* ───────── STATUS BLOCK ───────── */}
          {status !== "IDLE" && <StatusBlock status={status} />}

          {/* ───────── FORM ───────── */}
          <div className="space-y-3 mb-4">
            <Field
              label="NAME"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <Field
              label="EMAIL"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Field
              label="MESSAGE"
              textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={status === "SENDING"}
              className="
              w-full border border-black/70 py-2 text-[11px]
              font-bold tracking-wider hover:bg-black/10
              transition disabled:opacity-50
            "
            >
              {status === "SENDING" ? "TRANSMITTING..." : "SEND MESSAGE"}
            </button>
          </div>

          {/* ───────── SOCIALS ───────── */}
          <div className="border-t border-black/70 pt-3">
            <div className="text-[10px] font-bold tracking-widest mb-2">
              CONNECT_CHANNELS
            </div>

            <div className="grid grid-cols-2 gap-2">
              <SocialLink
                icon={<FaGithub />}
                label="GITHUB"
                href="https://github.com/KushDastane"
              />
              <SocialLink
                icon={<FaLinkedin />}
                label="LINKEDIN"
                href="https://www.linkedin.com/in/kush-dastane/"
              />
              <SocialLink
                icon={<FaInstagram />}
                label="INSTAGRAM"
                href="https://instagram.com/kushashishdastane"
              />
              <SocialLink
                icon={<FaEnvelope />}
                label="EMAIL"
                href="mailto:kushdastane69211@gmail.com"
              />
            </div>
          </div>

          {/* ───────── FOOTER ───────── */}
          <div className="mt-4 pt-2 text-[10px] flex justify-between border-t border-black/70">
            <span>
              C:\CONTACT&gt;<span className="blink">_</span>
            </span>
            <span>[ESC]</span>
          </div>
        </div>
      </div>
    </CRTScreen>
  );
}

/* ───────────────── COMPONENTS ───────────────── */

function Field({ label, type = "text", textarea, value, onChange }) {
  return (
    <label className="flex flex-col gap-1 text-[10px]">
      <span className="font-bold tracking-wider">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={onChange}
          className="border-2 border-black/70 bg-transparent px-2 py-1
                     text-xs resize-none focus:outline-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="border-2 border-black/70 bg-transparent px-2 py-1
                     text-xs focus:outline-none"
        />
      )}
    </label>
  );
}

function SocialLink({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-black/60 px-2 py-2 flex items-center gap-2
                 text-[10px] hover:bg-black/10 transition"
    >
      <span className="text-sm opacity-80">{icon}</span>
      <span className="tracking-wider">{label}</span>
    </a>
  );
}

function StatusBlock({ status }) {
  const map = {
    SENDING: {
      title: "TRANSMITTING",
      color: "bg-yellow-50 border-yellow-700",
      text: "SENDING DATA PACKET...",
    },
    SENT: {
      title: "SUCCESS",
      color: "bg-green-50 border-green-700",
      text: "MESSAGE DELIVERED ✔",
    },
    ERROR: {
      title: "FAILED",
      color: "bg-red-50 border-red-700",
      text: "TRANSMISSION ERROR ✖",
    },
  };

  const s = map[status];

  return (
    <div className={`mb-3 border-2 ${s.color} p-2 text-[10px]`}>
      <div className="font-bold mb-1">{s.title}</div>
      <div>{s.text}</div>
    </div>
  );
}
