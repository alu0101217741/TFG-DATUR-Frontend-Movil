import { IonButtons, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import "./Toolbar.css";

const Toolbar: React.FC = () => {
  return (
    <IonToolbar color="primary" mode="md">
      <IonTitle>
        <img src="assets/images/daturMobile.png" alt="Datur logo" />
      </IonTitle>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
