"use client";

export default function ButtonSimple({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      data-component="button-simple"
      className={className}
      {...props}
    >
      <span className="inner-wrapper" />
      <span className="label">{children}</span>
      <span className="bg" />
    </button>
  );
}
