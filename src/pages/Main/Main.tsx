import { 
  IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs,
} from '@ionic/react';
import { cashOutline, cashSharp, homeOutline, homeSharp, listOutline, listSharp, settingsOutline, settingsSharp, thunderstormOutline, thunderstormSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';
import { data } from '../../firebaseConfig';
import Settings from '../Settings/Settings';
import ShoppingList from '../ShoppingList/ShoppingList';
import Quotation from '../Quotation/Quotation';
import Forecast from '../Forecast/Forecast';

const reference = data.ref('users')

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Lista de Compras',
    url: '/ShoppingList',
    iosIcon: listOutline,
    mdIcon: listSharp
  },
  {
    title: 'Previsão do Tempo',
    url: '/Forecast',
    iosIcon: thunderstormOutline,
    mdIcon: thunderstormSharp
  },
  {
    title: 'Cotação',
    url: '/Quotation',
    iosIcon: cashOutline,
    mdIcon: cashSharp
  },
  {
    title: 'Configurações',
    url: '/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
];

const Main: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<string>('')

  useEffect(() => {
    const onChangeValue = reference.child(id).on('value', snapshot => {
      setUser(snapshot.child('username').val())
    })

    return () => reference.off('value', onChangeValue)
  }, [reference])

  useEffect(() => {
    console.log(id)
  }, [])

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/:id" render={() => <Redirect to={"/tabs/" + id + "/ShoppingList"} />} exact />
        <Route path="/tabs/:id/ShoppingList/" component={ShoppingList}/>
        <Route path="/tabs/:id/Settings/" component={Settings}/>
        <Route path="/tabs/:id/Forecast/" component={Forecast}/>
        <Route path="/tabs/:id/Quotation/" component={Quotation}/>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {appPages.map((appPage, index) => {
          return (
            <IonTabButton
              key={index}
              tab={appPage.url + id} 
              href={"/tabs/"+ id + appPage.url}
            >
              <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
              <IonLabel>{appPage.title}</IonLabel>
            </IonTabButton>
          );
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default Main;