import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import React from "react";

// Mirar: routerAnimation, routerDirection
interface ContainerProps {
  path: string;
  label: string;
  src: string;
  title: string;
  text: string;
  details: string;
}

const Card: React.FC<ContainerProps> = (props) => {
  return (
    <>
      <IonCard button={true} href={props.path} mode="md" class="card-style">
        <div className="cards-item-pic-wrap" data-category={props.label}>
          <img className="cards-item-img" alt="Travel" src={props.src} />
        </div>
        <IonCardHeader>
          <IonCardTitle>{props.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p className="main-card-text"> {props.text} </p>
          <p className="cards-item-details">{props.details}</p>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default Card;
