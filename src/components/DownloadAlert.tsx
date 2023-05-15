//aprecer por alguns minutos - alerta com linck de click 
//notificação 
// eslint-disable-next-line
import React  from "react";
import './styles/DownloadAlert.css';

let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function DownloadAlert() {
  // ...
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('O usuário instalou o aplicativo');
      } else {
        console.log('O usuário não instalou o aplicativo');
      }

      setTimeout(() => {
        deferredPrompt = null;
      }, 3000); // atraso de 5 segundos
    });
  }
  
}

export default DownloadAlert;

