import Header from "../components/Header";
import {ContactContainer} from "../components/styles/Form";
import {Link} from "react-router-dom";
import {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

export const Contact = () => {

    const [message, setMessage] = useState('');

    return <>
        <Header titulo={'Contato'}/>
        <ContactContainer className="flex justify-content-center">
            <h1>Entre em contato conosco</h1>

            <div className="flex justify-content-center">
                <InputTextarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} cols={40}
                               placeholder="Digite sua mensagem"/>
            </div>
            <div className="">
                <Link to={`https://wa.me/5531986191921?text=${encodeURI(message)}`}>
                    <Button icon="pi pi-whatsapp" severity="success" label="Enviar Mensagem" className="p-button-label"
                            rounded/>
                </Link>

                <p>OU</p>
                <Link to={'https://www.instagram.com/hyperpongbh/'}>
                    <Button icon="pi pi-instagram" severity="help" label="Instagram" className="p-button-label"
                            rounded/>
                </Link>
            </div>
        </ContactContainer>
    </>
}