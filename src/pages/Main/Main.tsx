import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonText, IonTitle, IonToolbar 
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';
import Menu from '../../components/Menu';
import { data } from '../../firebaseConfig';
import ShoppingList from '../ShoppingList/ShoppingList';

const reference = data.ref('users')

const Main: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<string>('')

  useEffect(() => {
    const onChangeValue = reference.child(id).on('value', snapshot => {
      setUser(snapshot.child('username').val())
    })

    return () => reference.off('value', onChangeValue)
  }, [reference])

  return (
    <IonPage>
      <Menu user={user} id={id}/>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{user}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonText>Seja bem-vindo, <b>{user}</b></IonText>
      </IonContent>
    </IonPage>
  );
};

export default Main;