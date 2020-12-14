import { 
  IonButton,
  IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar 
} from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { data } from '../../firebaseConfig';
import './ShoppingList.css';

const reference = data.ref('users')

interface ShoppingList {
  label: string,
  checked: boolean,
  id: string
}

const ShoppingList: React.FC = () => {
  const [list, setList] = useState<ShoppingList[]>()
  const [change, setChange] = useState<boolean>(false)
  
  const { id } = useParams<{ id: string }>();

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

  function handleChecked(id:string, checked: boolean, label: string) {
    userInfo.child("list/" + id).update({label, checked: !checked})
  }

  function handleChangeLabel(id: string, checked: boolean, label: string) {
    userInfo.child("list/" + id).update({label, checked})
  }

  function handleNewItem() {
    const NewReference = userInfo.child('list').push();
    const id = NewReference.key;

    NewReference.set({id, label: '', checked: false})
  }

  function handleDelete(id: string) {
    userInfo.child('list/' + id).remove()
    if (list?.length == 1) {
      setList(undefined)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Lista de Compras</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {list
          ? list.map(({label, checked, id}) => (
            <IonItem key={id} color={checked ? "medium" : ''}>
              <IonCheckbox 
                slot="start" 
                value={label} 
                checked={checked} 
                onIonChange={() => handleChecked(id, checked, label)}
              />
              {checked
              ? <IonLabel>{label}</IonLabel>
              : <IonInput
                value={label}
                placeholder="Digite o nome do item" 
                onIonChange={e => handleChangeLabel(id, checked, e.detail.value!)}
              />
              }
              <IonFab vertical="center" horizontal="end">
                <IonFabButton
                  onClick={() => handleDelete(id)}
                >
                  <IonIcon icon={trash}/>
                </IonFabButton>
              </IonFab>
            </IonItem>
            ))
            : <IonTitle>Acrescente um Item</IonTitle>
          }
        </IonList>
        <IonButton
          onClick={handleNewItem}
        >
          <IonIcon icon={add} />
          <IonLabel>Adicionar Item</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingList;
