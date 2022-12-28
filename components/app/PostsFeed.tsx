import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Post, ServicesType } from "../../utils/types"

export default function PostsFeed({
  posts,
  admin,
}: {
  posts: Post[]
  admin: boolean
}): JSX.Element {
  return (
    <div className='my-8'>
      <h1 className='text-2xl font-bold my-2 underline'>Posts Feed</h1>
      <div className='grid grid-cols-3 gap-4'>
        {posts
          ? posts.map((post) => (
              <PostItem post={post} key={post.slug} admin={admin} />
            ))
          : null}
        {posts.length === 0 && (
          <p className=''>This user haven't post anything . . .</p>
        )}
      </div>
    </div>
  )
}

function PostItem({
  post,
  admin,
}: {
  post: Post
  admin: boolean
}): JSX.Element {
  // console.log("[PostItem]post:", post)

  function iconType(type: ServicesType) {
    if (type === "vacant_land") {
      return "/icon/solid/solid-field-stack.svg"
    } else if (type === "real_estate") {
      return "/icon/solid/solid-home.svg"
    } else if (type === "property") {
      return "/icon/solid/solid-property.svg"
    } else if (type === "condomidium") {
      return "/icon/solid/solid-condo.svg"
    } else if (type === "product") {
      return "/icon/solid/solid-truck.svg"
    } else if (type === "service") {
      return "/icon/solid/solid-service.svg"
    }
  }

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img
        className='max-w-sm max-h-lg min-w-[25px] min-h-[25px] bg-white'
        src={post.photoUrl ? `${post.photoUrl}` : "/pic/field.png"}
        alt=''
      />
      <div className='flex flex-col'>
        <div className='px-6 py-4'>
          <header className='flex flex-wrap'>
            <p className='font-bold text-xl max-h-20 overflow-auto mb-2'>
              {post.title}
            </p>
          </header>
          <div className='flex'>
            <span className='inline-block bg-lime-50 rounded-full ml-auto px-3 py-1 text-md text-slate-900  mb-2'>
              <b className='text-md font-semiblod'>Price:</b> {post.price}
            </span>
          </div>
          <ReactMarkdown className='my-2 p-2 max-h-36 overflow-auto border-2 border-black bg-teal-50 text-slate-900 text-base rounded-md'>
            {post.content}
          </ReactMarkdown>
          <div className='flex my-2 p-2 bg-gray-300 rounded-lg'>
            <img
              src={
                `${iconType(post.typeOfService)}` ||
                "/icon/location-blue-marker.svg"
              }
              className='m-1 w-[25px] h-[25px]'
            />
            <p>
              <b className='text-md'>Address: </b>
              {`${post.address.streetAddress1 || ""} ${
                post.address.streetAddress2 || ""
              } ${post.address.district} ${post.address.locality} ${
                post.address.province
              } ${post.address.country} ${post.address.zipCode}`}
            </p>
          </div>
          <div className='flex content-center items-center justify-center'>
            <div className='bg-lime-500 hover:bg-lime-400 text-white font-bold py-1 px-2 border-solid border-b-4 border-lime-700 hover:border-lime-500 rounded cursor-pointer'>
              <Link
                href={`/${post.username}`}
                className='flex items-center mt-2'
              >
                @ {post.username}
              </Link>
            </div>
            <span className='inline-block bg-gray-200 rounded-full ml-auto p-2 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              phone: {post.phone}
            </span>
          </div>
        </div>
        <footer className='mt-auto mb-1 px-6 pt-3 pb-2 flex'>
          {admin && (
            <div className='text-blue-600 underline cursor-pointer'>
              <Link
                href={`/admin/${post.slug}`}
                className='text-blue-600 underline  cursor-pointer'
              >
                Edit
              </Link>
            </div>
          )}
          <div className='text-blue-600 underline ml-auto cursor-pointer'>
            <Link href={`/${post.username}/${post.slug}`}>View detail</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
