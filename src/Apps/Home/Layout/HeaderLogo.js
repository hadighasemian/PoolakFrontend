import styled, {keyframes} from "styled-components";
import logo from '../../../Resource/Icons/main.svg';

function HeaderLogo() {
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
      //margin: 1em 1em 1em 1em;
      border-radius: 5vmin;
      animation: ${rotate} 50s linear infinite;
      height: 4vmin;
      //background: #9b9b9b;
      display: inline;
      pointer-events: none;
    `;
    return(
        <LoginLogo src={logo}  alt="logo" />
    );
}
export default HeaderLogo;