'use client'

import { CircularProgress } from "@mui/material"

export default function Loading() {
  return (
    <div className='d-flex h-100 align-content-center justify-content-center'>
      <CircularProgress className='m-auto' color="secondary" />
    </div>
  )
}