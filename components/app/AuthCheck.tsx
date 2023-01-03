import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "../../lib/context"

// Component's children only shown to logged-in user
export default function AuthCheck(props: any): JSX.Element {
  const { username, line, facebook } = useContext(UserContext)
  return username && line && facebook
    ? props.children
    : props.fallback || (
        <p
          className='text-3xl
        '
        >
          Please{" "}
          <Link
            href='/login'
            className='font-bold text-sky-600 underline cursor-pointer '
          >
            {" "}
            Sign In{" "}
          </Link>
          or{" "}
          <Link
            href={username ? `/${username}` : "/login"}
            className='font-bold text-sky-600 underline cursor-pointer '
          >
            set up your Line Id and Facebook account{" "}
          </Link>{" "}
          before proceeding.
        </p>
      )
}
