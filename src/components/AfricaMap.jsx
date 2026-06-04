export default function AfricaMap({ className = "", size = 60, style = {} }) {
  return (
    <img 
      src="/africa.png"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{
        ...style,
        objectFit: "contain",
        opacity: 0.45,
      }}
      draggable={false}
    />
  );
}