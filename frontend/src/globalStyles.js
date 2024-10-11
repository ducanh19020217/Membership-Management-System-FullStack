// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import {defaultTheme} from "./utils/themes";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  .root {
  }
  
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
      
  }
  
  .ant-layout-sider {
  background: white;
      border-right: 1px solid ${defaultTheme.colors.border};
  }

  .ant-layout-header {
      background: white;
      border-bottom: 1px solid ${defaultTheme.colors.border};
  }
`;

export default GlobalStyles;
