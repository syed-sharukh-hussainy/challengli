import React, { ComponentProps, useMemo } from "react"
import { Buffer } from "buffer"
import { Image } from "react-native"

const bucket = "challengli-app"
const URL = "https://dypo9iy7jzhc3.cloudfront.net/"

type Props = {
  imgKey: string
} & Omit<ComponentProps<typeof Image>, "source">

const SmartImage = ({ imgKey, ...imageProps }: Props) => {
  const uri = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: imgKey,
      edits: {
        resize: {
          width: 300,
          height: 300,
          fit: "contain",
        },
      },
    })

    const encoded = Buffer.from(imageRequest).toString("base64")
    return URL + encoded
  }, [imgKey])

  return <Image source={{ uri }} {...imageProps} />
}

export default SmartImage
