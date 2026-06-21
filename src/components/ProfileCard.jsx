export default function ProfileCard() {
  return (
    <div className="profile-card">

      <img
        src="/avatar.jpg"
        alt="avatar"
        className="avatar"
      />

      <h1>Đặng Kiên</h1>

      <p className="job">
        Kỹ thuật viên tại{" "}
        <a
          href="https://www.goertek.com/"
          target="_blank"
          rel="noreferrer"
        >
          Công ty TNHH Goertek Vina
        </a>
      </p>

      <p className="job2">
        Python Developer
      </p>

      <p className="bio">
        Automation • Python • AI • Web Development
      </p>

    </div>
  );
}