import React from "react"
import toast from "react-hot-toast"

const test = () => {
  const notify = () => {
    toast.custom(
      <div className='border-2 border-black'>
        <form>
          <span>password:</span>
          <input />
        </form>
      </div>
    )
  }
  return (
    <div>
      <button onClick={notify}> toast</button>
    </div>
  )
}

export default test
