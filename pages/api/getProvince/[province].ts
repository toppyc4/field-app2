import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("running getProvince from api")
  const { province } = req.query
  if (!province) {
    res.status(400).json({ error: "Missing province" })
    return
  }

  const url =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const query = `${url}?input=${province}&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry&key=${key}`
  await fetch(query)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export const config = {
  api: {
    externalResolver: true,
  },
}
