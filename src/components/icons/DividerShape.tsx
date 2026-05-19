export function DividerLeft({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 168 154" className={className} style={style}>
      <path
        fill="currentColor"
        d="M168 .002 167.905 0a9.06 9.06 0 0 0-6.622 2.877l-126.441 136C29.488 144.636 33.578 154 41.447 154H0c3.668 0 7.166-1.545 9.633-4.255L133.784 13.382C138.463 8.242 134.811 0 127.856 0H168z"
      />
    </svg>
  );
}

export function DividerRight({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 168 154" className={className} style={style}>
      <path
        fill="currentColor"
        d="M0 .002.095 0a9.06 9.06 0 0 1 6.622 2.877l126.441 136c5.354 5.759 1.264 15.123-6.605 15.123H168a13.03 13.03 0 0 1-9.633-4.255L34.216 13.382C29.537 8.242 33.189 0 40.145 0H0z"
      />
    </svg>
  );
}
