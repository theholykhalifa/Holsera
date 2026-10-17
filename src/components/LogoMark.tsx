/**
 * Mark-only logo. Deliberately free of server-only imports so it is
 * safe to use inside client components (Header) as well as server ones.
 */
export function LogoMark({ height = 30 }: { height?: number }) {
  const width = Math.round((302 / 489) * height);
  return (
    <img
      src="/brand/logo-mark.png"
      alt=""
      width={width}
      height={height}
      className="brand__mark"
      decoding="async"
    />
  );
}

export default LogoMark;
