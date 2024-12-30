import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        data-name="Layer 1"
        viewBox="0 0 52 52"
        {...props}
    >
        <path d="M50 12.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4ZM50 28H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4ZM50 43.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4Z" />
    </svg>
);
const Hamburger = memo(SvgComponent);
export default Hamburger;
