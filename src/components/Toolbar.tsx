import { IonButtons, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import "./Toolbar.css";

const Toolbar: React.FC = () => {
  return (
    <IonToolbar color="primary" mode="md">
      <IonTitle>Turismo</IonTitle>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
    </IonToolbar>
  );
};

export default Toolbar;
