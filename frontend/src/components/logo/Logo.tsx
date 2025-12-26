import LogoImg from "/logo.png";

export function Logo() {
  return <img className="block object-cover w-42 xl:w-full max-w-76 pointer-events-none" src={LogoImg} alt="Logo" />;
}
