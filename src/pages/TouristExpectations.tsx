import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import BusinessProgressGraph from "../components/touristExpectations/BusinessProgressGraph";
import OccupancyRateForecastGraph from "../components/touristExpectations/OccupancyRateForecastGraph";
import TouristExpectationsContent from "../components/touristExpectations/TouristExpectationsContent";
import TouristExpectationsTitle from "../components/touristExpectations/TouristExpectationsTitle";

const TouristExpectations: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <TouristExpectationsTitle />
        <TouristExpectationsContent />
        <OccupancyRateForecastGraph />
        <BusinessProgressGraph />
      </IonContent>
    </IonPage>
  );
};

export default TouristExpectations;
