import { Link } from "@inertiajs/react";

export default function Button({
    className = "",
    disabled,
    children,
    type = "link",
    ...props
}) {
    if (type === "button") {
        return (
            <button
                {...props}
                className={
                    `self-start bg-emerald-400 hover:bg-emerald-600 py-3 px-6 my-6 text-white font-bold ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </button>
        );
    } else {
        return (
            <Link
                {...props}
                className={
                    `self-start bg-emerald-400 hover:bg-emerald-600 py-3 px-6 my-6 text-white font-bold ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </Link>
        );
    }
}
