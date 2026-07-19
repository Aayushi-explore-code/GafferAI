import logo from "../../assets/logo/gaffer-logo.svg";
import icon from "../../assets/logo/gaffer-icon.svg";

export default function Logo({
  variant = "logo",
  size = 48,
  className = "",
}) {
  const src = variant === "icon" ? icon : logo;

  return (
    <img
      src={src}
      alt="Gaffer Logo"
      width={size}
      height={size}
      draggable={false}
      className={`
        select-none
        drop-shadow-[0_0_14px_rgba(250,204,21,0.25)]
        ${className}
      `}
    />
  );
}