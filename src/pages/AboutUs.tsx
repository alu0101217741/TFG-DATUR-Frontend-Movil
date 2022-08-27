import { IonCardHeader, IonCardTitle, IonCard,IonCardContent, IonContent, IonHeader, IonPage } from "@ionic/react";
import Toolbar from "../components/Toolbar";

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader color="primary">
        <Toolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonCard class="card-style">
          <IonCardHeader>
            <IonCardTitle>Información sobre la app</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="main-card-text">
          Esta aplicación muestra información acerca del turismo canario, a través
              de la visualización de los últimos datos disponibles para cuatro
              de los aspectos más relevantes del sector. Estos datos se obtienen
              del repositorio Canarias Datos Abiertos, de manera que la
              información de la app se actualiza a medida que lo hace esta
              fuente oficial.
      </IonCardContent>
        </IonCard>
        <IonCard class="card-style">
          <IonCardHeader>
            <IonCardTitle>Enlaces recomendados</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="main-card-text">
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://datos.canarias.es/portal/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Canarias Datos Abiertos
                </a>
              </li>
              <li>
                <a
                  href="http://www.gobiernodecanarias.org/istac/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instituto Canario de Estadística
                </a>
              </li>
              <li>
                <a
                  href="https://www.highcharts.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Highcharts
                </a>
              </li>
            </ul>
      </IonCardContent>
        </IonCard>
        <IonCard class="card-style">
          <IonCardHeader>
            <IonCardTitle>Contacto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="main-card-text">
            Aplicación realizada por Alberto Mendoza Rodríguez como proyecto de
            Trabajo de Fin de Grado.
            <div>
                <a href="mailto:albertomrodriguez03@gmail.com">
                  <img
                    src="https://img.icons8.com/color/48/000000/gmail.png"
                    alt="gmail icon"
                    className="gmail-icon"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/alberto-mendoza-rodríguez-6a672a234"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/linkedin.png"
                    alt="linkedin icon"
                    className="linkedin-icon"
                  />
                </a>
                </div>
      </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Page;
