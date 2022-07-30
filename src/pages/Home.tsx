import { IonContent, IonHeader, IonPage } from "@ionic/react";
import CardsGroup from "../components/CardsGroup";
import SloganSection from "../components/SloganSection";
import Toolbar from "../components/Toolbar";
import "./Home.css";

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <SloganSection />
        <CardsGroup />
      </IonContent>
    </IonPage>
  );
};

export default Page;
