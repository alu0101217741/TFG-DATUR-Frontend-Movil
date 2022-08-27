import Card from "../components/Card";
import "./CardsGroup.css";

const CardsGroup: React.FC = () => {
  return (
    <>
      <div className="card-container">
        <h1>Nuestras secciones</h1>
      </div>
      <div className="ion-padding">
        <Card
          src="assets/images/touristNumberAndNationalities.jpg"
          title="Número de turistas"
          text="Conoce el número de turistas que visitan las Islas Canarias, incluyendo su evolución, nacionalidades y distribución por islas."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-number"
        />
        <Card
          src="assets/images/tourist-spending.jpg"
          title="Gasto turístico"
          text="Observa la evolución del gasto turístico por año y trimestre, con un desglose del gasto por conceptos."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-spending"
        />
        <Card
          src="assets/images/touristStay.jpg"
          title="Estancia turística"
          text="Infórmate sobre la estancia media de los turistas, teniendo en cuenta el año, lugar de residencia, isla y tipo de alojamiento."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-stay"
        />
        <Card
          src="assets/images/img-header-energy-data.png"
          title="Expectativas turísticas"
          text="Consigue una visión del futuro del sector turístico, a través de las expectativas del grado de ocupación y la marcha del negocio."
          label="Instituto Canario de Estadística"
          details="Actualización estimada: mensual"
          path="/tourist-expectations"
        />
      </div>
    </>
  );
};

export default CardsGroup;
