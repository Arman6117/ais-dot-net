import React, { Children } from 'react'

const Eyebrow = ({children}:Readonly<{
    children:React.ReactNode
}>) => {
  return (
    <>
    <div className="w-5.5 h-[1.5px] bg-[#1A56DB]" />
    <span className="text-sm font-bold tracking-[0.24em] uppercase text-[#1A56DB]">
     {children}
    </span>
    </>
  
  )
}

export default Eyebrow