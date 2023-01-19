import { useEffect, useState } from "react";
import axios from "axios";

const ModalPinjam = () => {
  const [peminjam, setPeminjam] = useState("");
  const [kendaraan, setKendaraan] = useState("");
  const [penyetuju, setPenyetuju] = useState("");
  const [pilihanKendaraan, setPilihanKendaraan] = useState(1);
  const [pilihanPenyetuju, setPilihanPenyetuju] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    getDataKendaraan();
    getDataPenyetuju();
  }, []);

  const getDataKendaraan = async () => {
    try {
      const dataKendaraan = await (await axios.get("http://localhost:8000/vehicles")).data;
      setKendaraan(dataKendaraan.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataPenyetuju = async () => {
    try {
      const dataPenyetuju = await (await axios.get("http://localhost:8000/penyetuju")).data;
      setPenyetuju(dataPenyetuju.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        penyetujuId: pilihanPenyetuju,
        kendaraanId: pilihanKendaraan,
        namaPeminjam: peminjam,
        status: "Diproses",
      };
      await axios.post("http://localhost:8000/pesanKendaraan", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  return (
    <div class="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Form Peminjaman Kendaraan
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          {kendaraan && penyetuju && (
            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                {error && (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Nama Peminjam
                  </label>
                  <input type="text" onChange={(e) => setPeminjam(e.target.value)} required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Kendaraan</label>
                  <select onChange={(e) => setPilihanKendaraan(e.target.value)} value={pilihanKendaraan} class="form-select" aria-label="Default select example">
                    {kendaraan.map((ken) => (
                      <option key={ken.id} value={ken.id}>
                        {ken.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Pihak Penyetuju</label>
                  <select onChange={(e) => setPilihanPenyetuju(e.target.value)} value={pilihanPenyetuju} class="form-select" aria-label="Default select example">
                    {penyetuju.map((peny) => (
                      <option value={peny.id} key={peny.id}>
                        {peny.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPinjam;
