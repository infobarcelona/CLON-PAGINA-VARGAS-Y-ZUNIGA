import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import QRCard from "@/components/site/QRCard";
import { MapPin, Phone, Clock, Mail, ArrowRight, Check } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("network");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Vargas y Zúñiga;Abogados;;;
FN:Vargas & Zúñiga Abogados
ORG:Vargas & Zúñiga Abogados
TEL;TYPE=WORK,VOICE:${t.contact.phone}
EMAIL;TYPE=WORK:avargas@vargasyzuniga.cl
ADR;TYPE=WORK:;;Antonio Varas 687 of. 1010 Torre Sinergia;Temuco;;;Chile
URL:https://vargasyzuniga.cl/
END:VCARD`;

  return (
    <div className="section-content section-enter" data-testid="section-contact">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 stagger">
          {/* Heading + info */}
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow">05 · {t.nav.contact}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="contact-title"
            >
              <span className="slash-red mr-1">/</span>{t.contact.title}
            </h2>

            <div className="mt-7" style={{ borderTop: "1px solid var(--bone-edge)" }}>
              <div className="py-4 grid grid-cols-12 gap-3" style={{ borderBottom: "1px solid var(--bone-edge)" }}>
                <div className="col-span-1 pt-1">
                  <MapPin size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.officeLabel}</div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      color: "var(--ink)",
                      marginTop: 2,
                    }}
                  >
                    {t.contact.address}
                  </div>
                  <div style={{ color: "var(--ink-mute)", fontSize: "13px", marginTop: 2 }}>
                    {t.contact.tower}
                  </div>
                </div>
              </div>
              <div className="py-4 grid grid-cols-12 gap-3" style={{ borderBottom: "1px solid var(--bone-edge)" }}>
                <div className="col-span-1 pt-1">
                  <Phone size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.phoneLabel}</div>
                  <a
                    href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                    data-testid="contact-phone"
                    style={{
                      display: "inline-block",
                      marginTop: 2,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      color: "var(--ink)",
                    }}
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </div>
              <div className="py-4 grid grid-cols-12 gap-3" style={{ borderBottom: "1px solid var(--bone-edge)" }}>
                <div className="col-span-1 pt-1">
                  <Mail size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.emailLabel}</div>
                  <div className="mt-1 flex flex-col gap-0.5">
                    <a
                      href="mailto:avargas@vargasyzuniga.cl"
                      data-testid="contact-email-1"
                      style={{ fontSize: "13.5px", color: "var(--ink)" }}
                    >
                      avargas@vargasyzuniga.cl
                    </a>
                    <a
                      href="mailto:mzuniga@vargasyzuniga.cl"
                      data-testid="contact-email-2"
                      style={{ fontSize: "13.5px", color: "var(--ink)" }}
                    >
                      mzuniga@vargasyzuniga.cl
                    </a>
                  </div>
                </div>
              </div>
              <div className="py-4 grid grid-cols-12 gap-3">
                <div className="col-span-1 pt-1">
                  <Clock size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.hoursLabel}</div>
                  <div style={{ fontSize: "13.5px", color: "var(--ink)", marginTop: 2 }}>
                    {t.contact.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form + QR */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-6">
              <form
                onSubmit={submit}
                data-testid="contact-form"
                className="col-span-12 md:col-span-8 space-y-4"
              >
                <div className="label">{t.contact.formTitle}</div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="field">
                    <label htmlFor="cf-name">{t.contact.form.name}</label>
                    <input
                      id="cf-name"
                      data-testid="contact-input-name"
                      value={form.name}
                      onChange={onChange("name")}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-email">{t.contact.form.email}</label>
                    <input
                      id="cf-email"
                      data-testid="contact-input-email"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="cf-subject">{t.contact.form.subject}</label>
                  <input
                    id="cf-subject"
                    data-testid="contact-input-subject"
                    value={form.subject}
                    onChange={onChange("subject")}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="cf-message">{t.contact.form.message}</label>
                  <textarea
                    id="cf-message"
                    data-testid="contact-input-message"
                    value={form.message}
                    onChange={onChange("message")}
                    rows={3}
                    required
                  />
                </div>
                <div className="flex items-center justify-between gap-4 pt-1">
                  <button
                    type="submit"
                    data-testid="contact-submit"
                    className="btn-primary"
                    disabled={status === "sending"}
                  >
                    {status === "success" ? (
                      <>
                        <Check size={13} strokeWidth={2} />
                        <span>OK</span>
                      </>
                    ) : (
                      <>
                        <span>{status === "sending" ? t.contact.form.sending : t.contact.form.send}</span>
                        <ArrowRight size={13} strokeWidth={1.7} />
                      </>
                    )}
                  </button>
                  {status === "success" && (
                    <span
                      data-testid="contact-success"
                      style={{ fontSize: "12px", color: "var(--accent)" }}
                    >
                      {t.contact.form.success}
                    </span>
                  )}
                  {status === "error" && (
                    <span
                      data-testid="contact-error"
                      style={{ fontSize: "12px", color: "var(--accent)" }}
                    >
                      {t.contact.form.error}
                    </span>
                  )}
                </div>
              </form>

              <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-end gap-3">
                <QRCard
                  data={vCardData}
                  caption={t.contact.qrCaption}
                  size={130}
                  testId="contact-qr"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
