import React, { PropsWithChildren } from 'react'
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import { MdOutlineErrorOutline } from "react-icons/md";




const ErrorMessage = ({children}:PropsWithChildren) => {
    if (!children)return null
  return (
    <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdOutlineErrorOutline />
          </Callout.Icon>
          <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
  )
}

export default ErrorMessage