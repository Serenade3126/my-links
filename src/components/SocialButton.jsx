export default function SocialButton({
  title,
  link,
  icon
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="social-btn"
    >
      <span className="social-icon">
        {icon}
      </span>

      <span>
        {title}
      </span>
    </a>
  );
}