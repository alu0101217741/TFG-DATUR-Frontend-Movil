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
            En esta sección se proporciona una visión global acerca de los
              turistas que visitan las Islas Canarias. Para ello, se muestra la
              evolución del número de turistas en los últimos años, sus
              nacionalidades, y la forma en la que se distribuyen por las islas.
              </p>
          </IonItem>
          <IonItem lines="none">
            <p>
            Para generar estas gráficas se han procesado los siguientes
              datasets del repositorio &nbsp;
              <b>
                <a
                  target="_blank"
                  href="https://datos.canarias.es/portal/"
                  rel="noreferrer"
                >
                  Canarias Datos Abiertos
                </a>
              </b>
              :
            </p>
          </IonItem>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/turistas-que-han-visitado-canarias-segun-lugares-de-residencia-por-periodos1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                Turistas que han visitado Canarias según lugares de
                    residencia por periodos
                </p>
              </IonCardContent>
            </IonCard>
          </div>
          <div className="center-card">
            <IonCard
              button={true}
              href="https://datos.canarias.es/catalogos/general/dataset/turistas-principales-segun-lugares-de-residencia-por-islas-de-canarias-y-periodos1"
              mode="md"
              target="_blank"
              class="card-link"
            >
              <IonCardContent className="card-button-content">
                <p>
                Turistas principales según lugares de residencia por islas
                    de Canarias y periodos
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
