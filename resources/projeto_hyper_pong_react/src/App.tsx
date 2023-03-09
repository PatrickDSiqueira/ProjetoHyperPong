import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Home from "./Pages/Home";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Home />}  />
    <Route path="/copas" element={<Home />}  />
    <Route path="/rachoes" element={<Home />}  />
    <Route path="/contato" element={<Home />}  />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;





// import {
//   BrowserRouter,
//   Route, Routes
// } from "react-router-dom";

// import Agradecimento from "./pages/Agradecimento/Agradecimento";
// import Dados from "./pages/Dados/Dados";
// import EdicaoDados from "./pages/edicaoDados/edicaoDados";
// import OrdemServico from "./pages/OrdemServico/OrdemServico";
// import Home from "./pages/Home";
// import Avalie from "./pages/Avalie/Avalie";
// import EdicaoClientes from "./pages/EdicaoClientes/EdicaoClientes";
// import { Login } from "./pages/Login/Login";
// import { AuthGoogleProvider } from "./contexts/authGoogle";
// import { PrivateRoutes } from "./PrivateRoutes";
// import { createGlobalStyle } from 'styled-components';
// import { BloqueioAcesso } from "./pages/BloqueiAcesso";


// export default function App() {

//   const GlobalStyle = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     font-family: 'Inter', sans-serif;
//     background-color:	#FFE4E1;
//   }
// `;

//   return (
//     <AuthGoogleProvider>
//       <GlobalStyle />
//       <BrowserRouter>
      //   <Routes>
      //      <Route index element={< Login />} /> 
      //    <Route index element={< BloqueioAcesso />} />
      //     <Route path="/home" element={< PrivateRoutes />} >
      //        <Route path="/home" element={< Home />} />
      //   </ Route>
      //  <Route path="/dados" element={<PrivateRoutes />}>
      //            <Route path="/dados" element={<Dados />} />
      // </Route>
//           <Route path="/avalie" element={<PrivateRoutes />}>
//             <Route path="/avalie" element={<Avalie />} />
//           </ Route>
//           <Route path="/agradecimento" element={<PrivateRoutes />}>
//             <Route path="/agradecimento" element={<Agradecimento />} />
//           </Route>
//           <Route path="/servico" element={<PrivateRoutes />}>
//             <Route path="/servico" element={<OrdemServico />} />
//           </Route>
//           <Route path="/edicaodados" element={<PrivateRoutes />}>
//             <Route path="/edicaodados" element={<EdicaoDados />} />
//           </Route>
//           <Route path="/clientes" element={<PrivateRoutes />}>
//             <Route path="/clientes" element={<EdicaoClientes />} />
//           </Route> */}

//         </Routes>
//       </BrowserRouter>
//     </AuthGoogleProvider>
//   );
// }