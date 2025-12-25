import { useState } from "react";
import emailjs from "@emailjs/browser";
import CRTScreen from "../CRTScreen";

export default function ContactScreen() {
  const [status, setStatus] = useState("IDLE");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("SENDING");

    emailjs
      .send(
        "service_b975r8v",
        "template_ykzmy4c",
        {
          from_name: e.target.name.value,
          from_email: e.target.email.value,
          message: e.target.message.value,
        },
        "xFLspg7cIcxfDEKsJ"
      )
      .then(
        () => {
          setStatus("SENT");
          e.target.reset();
        },
        () => {
          setStatus("ERROR");
        }
      );
  }

  return (
    <CRTScreen>
      <div className="crt-frame p-6 sm:p-7 flex flex-col h-full">
        {/* TOP BAR */}
        <div className="flex justify-between text-xs sm:text-sm pb-3 mb-5 border-b-2 border-black/70">
          <span>SYSTEM_ROOT // CONTACT_INTERFACE</span>
          <span>NETWORK: ONLINE</span>
        </div>

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest mb-1">
          CONTACT.sys
        </h1>
        <p className="text-xs opacity-70 mb-6">MODE: MESSAGE_TRANSMISSION</p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <Field label="NAME" name="name" />
          <Field label="EMAIL" name="email" type="email" />
          <Field label="MESSAGE" name="message" textarea />

          <button
            type="submit"
            className="border-2 border-black/70 px-4 py-2 text-xs sm:text-sm
                       hover:bg-black/10 transition self-start"
          >
            SEND_MESSAGE
          </button>
        </form>

        {/* STATUS */}
        <div className="mt-4 text-xs font-mono opacity-80">
          STATUS :: {status === "IDLE" && "AWAITING_INPUT"}
          {status === "SENDING" && "TRANSMITTING..."}
          {status === "SENT" && "MESSAGE_SENT ✔"}
          {status === "ERROR" && "TRANSMISSION_FAILED ✖"}
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-4 text-xs flex justify-between border-t-2 border-black/70">
          <span>
            C:\CONTACT&gt; READY<span className="blink">_</span>
          </span>
          <span>[ESC] EXIT</span>
        </div>
      </div>
    </CRTScreen>
  );
}

/* ================= INPUT FIELD ================= */

function Field({ label, name, type = "text", textarea }) {
  return (
    <label className="flex flex-col text-xs gap-1">
      <span>{label}</span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={4}
          className="border-2 border-black/70 bg-transparent px-2 py-1
                     focus:outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          required
          className="border-2 border-black/70 bg-transparent px-2 py-1
                     focus:outline-none"
        />
      )}
    </label>
  );
}
