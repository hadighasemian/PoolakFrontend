'use client'

import styled, { keyframes } from "styled-components"
import Image from 'next/image'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AppLogo = styled.div`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  border-radius: 3px;
  animation: ${rotate} 50s linear infinite;
  display: block;
  height: 20vmin;
  pointer-events: none;
  position: relative;
`

export default function SplashLogo() {
  return (
    <AppLogo>
      <Image 
        src="/icons/main.svg" 
        alt="logo" 
        fill
        style={{ objectFit: 'contain' }}
      />
    </AppLogo>
  )
}