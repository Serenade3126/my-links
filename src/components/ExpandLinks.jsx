import { useState } from "react";

export default function ExpandLinks() {

  const [open, setOpen] = useState(false);

  return (
    <div>

      <button
        className="more-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? "Thu gọn" : "+ Xem thêm"}
      </button>

      {open && (

        <div className="extra-links">

          <a href="#">
            Discord
          </a>

          <a href="#">
            YouTube
          </a>

          <a href="#">
            Telegram
          </a>

          <a href="#">
            Portfolio
          </a>

          <a href="#">
            CV
          </a>

        </div>

      )}

    </div>
  );
}