import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import TouristSpendingChart from "../components/touristSpending/TouristSpendingChart";
import TouristSpendingContent from "../components/touristSpending/TouristSpendingContent";
import TouristSpendingTitle from "../components/touristSpending/TouristSpendingTitle";

const TouristSpending: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <TouristSpendingTitle />
        <TouristSpendingContent />
        <TouristSpendingChart />
        <h1>Añadir lo de gasto por nacionalidad</h1>
      </IonContent>
    </IonPage>
  );
};

export default TouristSpending;
