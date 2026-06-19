import { buildQrUrl } from "@/lib/site-utils";

const QRCard = ({ data, caption, size = 130, testId }) => {
  return (
    <div className="qr-card" data-testid={testId}>
      <div className="qr-frame" style={{ width: size, height: size }}>
        <span className="qr-corner qr-tl" />
        <span className="qr-corner qr-tr" />
        <span className="qr-corner qr-bl" />
        <span className="qr-corner qr-br" />
        <img src={buildQrUrl(data, size * 2)} alt={caption || "QR"} />
      </div>
      {caption && <div className="qr-cap">{caption}</div>}
    </div>
  );
};

export default QRCard;
