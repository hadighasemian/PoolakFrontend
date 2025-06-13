'use client'; // styled-components can be used in client components
import React from 'react';
import styled, {keyframes} from "styled-components";
import logo from '@/Resource/Icons/main.svg'; // Adjusted path for Next.js public or static handling

// Ensure Next.js is configured to handle SVG imports, or use next/image
// For direct SVG import to work as a 'src' attribute, webpack config might be needed (file-loader/svgr)
// For simplicity now, assuming 'logo' can be resolved. If not, <Image> from 'next/image' is better.

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
}`;

const StyledLoginLogo = styled.img`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em 1em 1em 1em;
  border-radius: 3px;
  animation: ${rotate} 50s linear infinite;
  display: block;
  height: 20vmin;
  pointer-events: none;
`;

function LoginLogo() {
    return(
        <StyledLoginLogo src={logo.src}  alt="logo" /> // Use logo.src if using next/image or file-loader outputs an object
    );
}
export default LoginLogo;
