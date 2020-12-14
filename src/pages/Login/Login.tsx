import { 
  IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar 
} from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../firebaseConfig';
import { presentToast } from '../../utils/toast';
import './Login.css';

const Login: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  let history = useHistory()

  async function login() {
    setBusy(true)
    const res = await loginUser(username, password)
    if(res) {
      presentToast('Logado com sucesso')
      history.push("/tabs/" + res)
      console.log(res)
    } else presentToast('Login falhou')
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
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
          placeholder="Nome de Usuário ou Email" 
          onIonChange={(e: any) => setUsername(e.target.value)}
        />
        <IonInput 
          type="password"
          placeholder="Senha" 
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonButton onClick={login}>Login</IonButton>
        <p>Não tenho uma conta <Link to="/page/Register">Registrar-se</Link>.</p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
