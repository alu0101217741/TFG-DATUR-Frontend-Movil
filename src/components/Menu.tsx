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
} from "@ionic/react";

import {
  archiveOutline,
  archiveSharp,
  heartOutline,
  heartSharp,
  home,
  homeSharp,
  paperPlaneOutline,
  paperPlaneSharp,
} from "ionicons/icons";
import { useLocation } from "react-router-dom";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inicio",
    url: "/home",
    iosIcon: home,
    mdIcon: homeSharp,
  },
  {
    title: "Número de turistas",
    url: "/tourist-number",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Gasto turístico",
    url: "/tourist-spending",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Estancia turística",
    url: "/tourist-stay",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Expectativas turísticas",
    url: "/tourist-expectations",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay" swipeGesture={true}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Turismo</IonListHeader>
          <IonNote>El turismo de Canarias en datos</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
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
