import { useState } from "react";
import axios from "axios";

const ModalTolak = (props) => {
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    try {
      const data = {
        status: "Ditolak",
      };
      await axios.put(`http://localhost:8000/pesanKendaraan/${props.data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div class="modal fade" id={`exampleModalTolak${props.data.id}`} tabIndex="-1" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 className="modal-title">Apakah Anda Yakin?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <p>Anda akan menolak peminjaman kendaraan.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Tidak
            </button>
            <button onClick={handleSubmit} type="button" class="btn btn-primary">
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTolak;
