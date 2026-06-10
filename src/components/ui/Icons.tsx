import { cn } from "@/lib/cn";

type Props = React.SVGProps<SVGSVGElement> & { className?: string };

export function IconArrowRight({ className, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} {...props}>
      <path
        d="M13 5l7 7-7 7M20 12H4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMail({ className, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} {...props}>
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M5.5 7.5 12 12.5l6.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMessage({ className, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} {...props}>
      <path
        d="M7 18.5 4 20V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8A2.5 2.5 0 0 1 17.5 17H7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5h8M8 12.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconPhone({ className, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} {...props}>
      <path
        d="M8.5 3.75h7A1.75 1.75 0 0 1 17.25 5.5v13A1.75 1.75 0 0 1 15.5 20.25h-7A1.75 1.75 0 0 1 6.75 18.5v-13A1.75 1.75 0 0 1 8.5 3.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 17h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

