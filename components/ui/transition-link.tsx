"use client";
import { usePageTransition } from "@/context/transition-context";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: Props) {
  const { trigger } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Skip for external links or same page anchors
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) return;

    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    trigger(href, x, y);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}