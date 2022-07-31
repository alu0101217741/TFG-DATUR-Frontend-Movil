import {
  IonCard,
  IonCardContent,
  IonItem,
  IonItemGroup,
  IonList,
  IonListHeader,
} from "@ionic/react";
import "./TouristNumberContent.css";

const TouristNumberContent: React.FC = () => {
  return (
    <div>
      <IonList>
        <IonListHeader>
          <h1>Información de la sección</h1>
        </IonListHeader>
        <IonItemGroup>
          <IonItem lines="none">
            <p>
              Se proporciona una visión global acerca del número de turistas que
              visitan las Islas Canarias, profundizando en las nacionalidades
              que visitan Canarias y la distribución de estos turistas por
              islas.
            </p>
          </IonItem>
          <IonItem lines="none">
            <p>
              Para generar estas gráficas se han utilizado dos datasets del
              repositorio
              <a href="https://datos.canarias.es/portal/">
                Canarias Datos Abiertos
              </a>
              :
            </p>
          </IonItem>
          <div className="center-card">
            <IonCard
              button={true}
              href=""
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Turistas que han visitado Canarias según lugares de residencia
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href=""
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                  Turistas según tipos de alojamiento por países de residencia
                </p>
              </IonCardContent>
            </IonCard>
          </div>
        </IonItemGroup>
      </IonList>
    </div>
  );
};

export default TouristNumberContent;
