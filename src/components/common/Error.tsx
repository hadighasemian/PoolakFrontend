'use client'

interface ErrorProps {
  error: {
    message: string
  }
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className='d-flex h-100 align-content-center justify-content-center'>
      <span className='m-auto' color="secondary">
        {error.message}
      </span>
    </div>
  )
}