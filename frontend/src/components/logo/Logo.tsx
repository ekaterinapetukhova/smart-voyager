import LogoImg from "/logo.png";

export function Logo() {
  return <img className="block object-cover w-full max-w-80 pointer-events-none" src={LogoImg} alt="Logo" />;
}
