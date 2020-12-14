import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React, { InputHTMLAttributes, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { 
  homeOutline, homeSharp, listOutline, listSharp, thunderstormOutline, thunderstormSharp, cashOutline, cashSharp, settingsOutline, settingsSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  user: string;
  id: string
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/page/Main',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Lista de Compras',
    url: '/page/ShoppingList',
    iosIcon: listOutline,
    mdIcon: listSharp
  },
  {
    title: 'Previsão do Tempo',
    url: '/page/Forecast',
    iosIcon: thunderstormOutline,
    mdIcon: thunderstormSharp
  },
  {
    title: 'Cotação',
    url: '/page/Quotation',
    iosIcon: cashOutline,
    mdIcon: cashSharp
  },
  {
    title: 'Configurações',
    url: '/page/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
];

const Menu: React.FC<InputProps> = ({ user, id }) => {
  const location = useLocation();

  useEffect(() =>  {
    console.log(location.pathname)
  }, [])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user}</IonListHeader>
          <IonNote>Nada por enquanto</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url + '/' + id} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
