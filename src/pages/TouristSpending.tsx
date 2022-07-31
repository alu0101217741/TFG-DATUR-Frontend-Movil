import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import TouristSpendingTitle from "../components/touristSpending/TouristSpendingTitle";

const TouristSpending: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <TouristSpendingTitle />
      </IonContent>
    </IonPage>
  );
};

export default TouristSpending;
