import { ButtonShare } from "../components/styles/Form";
import { BsShare as IconShare } from "react-icons/bs";

const ShareButton = () => {

  const handleShare = () => {

    if (navigator.share) {

      navigator.share({
        url: window.location.href.toString()
      })
        .then(() => console.log('Compartilhado com sucesso!'))
        .catch((error) => console.log('Erro ao compartilhar:', error));

    } else {
      
      console.log('Compartilhamento não suportado neste navegador.');
    }
  };

  return (
    <ButtonShare type="button" onClick={handleShare}>
      Compartilhar <IconShare/>
    </ButtonShare>
  );
};

export default ShareButton;
