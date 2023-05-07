import Header from "../components/Header";
import {ButtonSave, ContactContainer, ContainerButtons, LabelDefault, TextAreaDefault} from "../components/styles/Form";
import {IoLogoWhatsapp as IconeWpp} from "react-icons/io";
import {Link, redirect, useNavigate} from "react-router-dom";
import {useState} from "react";
import {BsInstagram as IconInstagram} from "react-icons/bs";
export const Contact = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    return <>
        <Header titulo={'Contato'}/>
        <ContactContainer> 
            <h1>Entre em contato conosco</h1>
            <TextAreaDefault id="mensagem" name="mensagem" placeholder="Digite sua mensagem" value={message} onChange={(e)=>setMessage(e.target.value)} rows={5} cols={40} required></TextAreaDefault><br/><br/>
            {/*<ContainerButtons>*/}
                <Link to={`https://wa.me/5531986191921?text=${encodeURI(message)}`}>

                <ButtonSave style={{width:'250px'}}  type="button"><IconeWpp/> Enviar Mensagem </ButtonSave>
                </Link>
            {/*</ContainerButtons>*/}

            <p style={{marginTop:'1rem'}}>OU</p>

            <Link to={'https://www.instagram.com/hyperpongbh/'} >
                <ButtonSave type="button" style={{width:'250px', background:'#993399'}}><IconInstagram/> Instagram</ButtonSave>
            </Link>


        </ContactContainer>


    </>
}