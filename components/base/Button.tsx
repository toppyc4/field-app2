// import Loader from "./Loader";
import { forwardRef } from "react"

export default forwardRef(function Button(
  {
    onClick,
    children,
    style,
    size,
    loading,
    className,
  }: {
    onClick?: () => void
    children: React.ReactNode
    style?: "primary" | "secondary" | "white" | "disabled"
    size?: "sm" | "md" | "lg"
    loading?: boolean
    className?: string
  },
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      onClick={style != "disabled" ? onClick : undefined}
      className={`rounded-md flex flex-row items-center gap-2 font-medium transition-all duration-200 ease-in-out ${
        style == "secondary"
          ? "bg-secondary-400/40 text-secondary-600 hover:bg-secondary-400/60 dark:bg-secondary-600/50 dark:hover:bg-secondary-600/60"
          : style == "white"
          ? "border-2 border-zinc-300 dark:border-zinc-50/50 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/20"
          : style == "disabled"
          ? "border-2 border-zinc-400/20 dark:border-zinc-50/20 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          : "bg-secondary-400 text-white/90 hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-400"
      } ${
        size == "sm"
          ? "text-sm px-2 py-1 max-h-8"
          : size == "md"
          ? "text-md px-3 py-1.5 max-h-10"
          : "text-lg px-4 py-2 max-h-12"
      } ${className}`}
    >
      {loading ? (
        <p>Loading . . .</p>
      ) : (
        // <Loader
        //   className={`w-8 ${
        //     style == "secondary"
        //       ? "text-secondary-600 dark:text-secondary-400"
        //       : style == "white"
        //       ? "text-zinc-300 dark:text-zinc-50/50"
        //       : style == "disabled"
        //       ? "text-gray-500 dark:text-gray-400"
        //       : "text-white/90 dark:text-white/90"
        //   }`}
        //   size={size ?? "md"}
        // />
        children
      )}
    </button>
  )
})
