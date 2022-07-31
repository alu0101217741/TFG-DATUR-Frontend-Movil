import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import TouristNumberContent from "../components/touristNumber/TouristNumberContent";
import TouristNumberGraph from "../components/touristNumber/TouristNumberGraph";
import TouristNumberTitle from "../components/touristNumber/TouristNumberTitle";

const TouristNumber: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <TouristNumberTitle />
        <TouristNumberContent />
        <TouristNumberGraph />
      </IonContent>
    </IonPage>
  );
};

export default TouristNumber;
