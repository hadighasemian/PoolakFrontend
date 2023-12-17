import styled, {keyframes} from "styled-components";
import logo from '../../Resource/Icons/main.svg';

function SplashLogo() {
    const rotate = keyframes`
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
    }`;
    const AppLogo = styled.img`
      color: #BF4F74;
      font-size: 1em;
      margin: 1em;
      border-radius: 3px;
      animation: ${rotate} 50s linear infinite;
      display: block;
      height: 20vmin;
      pointer-events: none;
    `;
    return(
        <AppLogo src={logo}  alt="logo" />
    );
}
export default SplashLogo;