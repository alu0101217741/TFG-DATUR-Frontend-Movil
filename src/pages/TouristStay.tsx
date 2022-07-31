import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";
import TouristStayChart from "../components/touristStay/TouristStayChart";
import TouristStayContent from "../components/touristStay/TouristStayContent";
import TouristStayTitle from "../components/touristStay/TouristStayTitle";

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <TouristStayTitle />
        <TouristStayContent />
        <TouristStayChart />
      </IonContent>
    </IonPage>
  );
};

export default Page;
