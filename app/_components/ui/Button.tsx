"use client";

import { forwardRef } from "react";
import { m } from "motion/react";
import { cn } from "@/app/_lib/cn";
import { useMagneticHover } from "@/app/_lib/useMagneticHover";

type Variant = "primary" | "outline";

const base =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-gold/70 px-6 py-3 font-mono-wide text-xs uppercase tracking-[0.2em] transition duration-200 hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.65)] disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-light hover:border-gold-light",
  outline: "bg-transparent text-gold-light hover:bg-gold hover:text-ink",
};

type ButtonOwnProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

// Framer Motion redefines these with its own (gesture-based) signatures,
// which conflict with the native DOM event types — never used on Button,
// so just excluded rather than reconciled.
type MotionConflictingProps = "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd";

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & { href?: undefined };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", className, children, ...props }, forwardedRef) {
    const classes = cn(base, variants[variant], className, "cursor-pointer");
    const magnetic = useMagneticHover<HTMLButtonElement | HTMLAnchorElement>();

    if ("href" in props && props.href) {
      const { href, ...anchorProps } = props;
      return (
        <m.a
          ref={mergeRefs(forwardedRef, magnetic.ref)}
          href={href}
          data-cursor="Klik"
          className={classes}
          style={magnetic.style}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          {...anchorProps}
        >
          {children}
        </m.a>
      );
    }

    const buttonProps = props as Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      MotionConflictingProps
    >;
    return (
      <m.button
        ref={mergeRefs(forwardedRef, magnetic.ref)}
        data-cursor="Klik"
        className={classes}
        style={magnetic.style}
        onMouseMove={magnetic.onMouseMove}
        onMouseLeave={magnetic.onMouseLeave}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        {...buttonProps}
      >
        {children}
      </m.button>
    );
  },
);
