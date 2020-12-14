import { 
  IonButton,
  IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar 
} from '@ionic/react';
import { logOut } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { data, deleteUser, loginOutUser } from '../../firebaseConfig';
import './Forecast.css';

const reference = data.ref('users')

interface ShoppingList {
  label: string,
  checked: boolean,
  id: string
}

const Forecast: React.FC = () => {
  const [list, setList] = useState<ShoppingList[]>()
  const [change, setChange] = useState<boolean>(false)
  
  const { id } = useParams<{ id: string }>();
  
  let history = useHistory()

  const userInfo = reference.child(id)

  useEffect(() => {
    const onChangeValue = reference.child(id).on('value', snapshot => {
      if (snapshot.child('list').val()) {
        setList(
          Object.values(snapshot.child('list').val())
        )
      }
    })

    return () => reference.off('value', onChangeValue)
  }, [change])

  function handleDelete() {
    deleteUser()
    history.push("/page/Login")
  }

  function handleLogout() {
    loginOutUser()
    history.push("/page/Login")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Previsão do Tempo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Forecast;