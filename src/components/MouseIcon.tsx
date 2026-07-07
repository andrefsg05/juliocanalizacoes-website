import type { SVGProps } from 'react'

export default function MouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C9.79086 4 8 5.79086 8 8V16C8 18.2091 9.79086 20 12 20C14.2091 20 16 18.2091 16 16V8C16 5.79086 14.2091 4 12 4ZM12 2C15.3137 2 18 4.68629 18 8V16C18 19.3137 15.3137 22 12 22C8.68629 22 6 19.3137 6 16V8C6 4.68629 8.68629 2 12 2ZM13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V10Z"
      />
    </svg>
  )
}
