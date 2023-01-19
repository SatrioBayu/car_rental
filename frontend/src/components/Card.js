import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div class="col">
      <div className="card h-100">
        <img src="https://www.toyota.astra.co.id/sites/default/files/2021-11/4-avanza-silver-mica-metallic.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.data.nama}</h5>
          <p className="card-text">
            <span className="fw-bold">Jenis</span>: {props.data.jenis}
          </p>
          <p className="card-text">
            <span className="fw-bold">Jadwal</span>: {props.data.jadwal}
          </p>
        </div>
        <div class="card-footer text-muted fw-bold">{props.data.kepemilikan}</div>
        <div class="card-footer text-muted">
          <Link to={`/detailKendaraan/${props.data.id}`} class="d-flex flex-column btn btn-primary">
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
