import Header from "../components/Header";
import {ButtonSave, ContainerButtons, LabelDefault, TextAreaDefault} from "../components/styles/Form";
import {IoLogoWhatsapp as IconeWpp} from "react-icons/io";
import {Link, redirect, useNavigate} from "react-router-dom";
import {useState} from "react";
import {BsInstagram as IconInstagram} from "react-icons/bs";
export const Contact = () => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    return <>
        <Header titulo={'Contato'}/>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'45px'}}>
        <h1>Entre em contato conosco</h1>
            <LabelDefault htmlFor="mensagem">Mensagem:</LabelDefault><br/>
            <TextAreaDefault id="mensagem" name="mensagem" value={message} onChange={(e)=>setMessage(e.target.value)} rows={5} cols={40} required></TextAreaDefault><br/><br/>
            {/*<ContainerButtons>*/}
                <Link to={`https://wa.me/5531986191921?text=${encodeURI(message)}`}>

                <ButtonSave style={{width:'250px'}}  type="button"><IconeWpp/> Enviar Mensagem </ButtonSave>
                </Link>
            {/*</ContainerButtons>*/}

            <p style={{marginTop:'1rem'}}>OU</p>

            <Link to={'https://www.instagram.com/hyperpongbh/'} >
                <ButtonSave type="button" style={{width:'150px', background:'#993399'}}><IconInstagram/> Instagram</ButtonSave>
            </Link>


        </div>


    </>
}