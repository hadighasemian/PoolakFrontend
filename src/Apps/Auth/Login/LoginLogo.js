import styled, {keyframes} from "styled-components";
import logo from '../../../Resource/Icons/main.svg';

function LoginLogo() {
    const rotate = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
    }`;
    const LoginLogo = styled.img`
      color: #BF4F74;
      font-size: 1em;
      margin: 1em 1em 1em 1em;
      border-radius: 3px;
      animation: ${rotate} 50s linear infinite;
      display: block;
      height: 20vmin;
      pointer-events: none;
    `;
    return(
        <LoginLogo src={logo}  alt="logo" />
    );
}
export default LoginLogo;