import { 
  IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar 
} from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../firebaseConfig';
import { presentToast } from '../../utils/toast';
import './Register.css';

const Register: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setCPassword] = useState<string>('');

  let history = useHistory()

  async function register() {
    const re = /\S+@+\S+\.\S+/
    
    if(password !== cPassword)
    return presentToast("As senhas precisam ser iguais")
    
    if (username.trim() === '' || password.trim() === '' || email.trim() === '')
    return presentToast("Insira usuário, email e senha para continuar")
    
    if(!re.test(email))
    return presentToast("Digite um email valido")
    
    setBusy(true)
    const res = await registerUser(username, email, password)
    if (res) {
      presentToast("Sua conta foi criada com sucesso")
      history.push("/page/Login")
    } 
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar</IonTitle>
        </IonToolbar>
      </IonHeader>

      {busy && 
        <IonLoading
          message="Por favor, aguarde..." 
          duration={0} 
          isOpen={busy}
      />}

      <IonContent className="ion-padding">
        <IonInput 
          placeholder="digite seu nome de Usuário" 
          onIonChange={(e: any) => setUsername(e.target.value)}
        />
        <IonInput 
          placeholder="digite seu Email" 
          onIonChange={(e: any) => setEmail(e.target.value)}
        />
        <IonInput 
          type="password"
          placeholder="Digite uma senha" 
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonInput 
          type="password"
          placeholder="Digite a senha novamente" 
          onIonChange={(e: any) => setCPassword(e.target.value)}
        />
        <IonButton onClick={register}>Registrar</IonButton>

        <p>Já tenho uma conta <Link to="/page/Login">Login</Link>.</p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
