import { useParams } from "react-router-dom";
import MySidebar from "../components/MySidebar";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/Button.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailKendaraan = () => {
  const { id } = useParams();
  const { toggleSidebar } = useProSidebar();
  const [kendaraan, setKendaraan] = useState("");
  const [dataGrafik, setDataGrafik] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await (await axios.get(`http://localhost:8000/vehicles/${id}`)).data;
        setKendaraan(data.data);
        const grafik = [data.data];
        setDataGrafik(grafik);
        console.log(grafik);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div class="main">
      <MySidebar />
      <div class="container my-4">
        <button className={`btn ${styles["toggle"]}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="text-center">Detail Kendaraan</h1>
        {kendaraan && (
          <div class="row my-4 align-items-center">
            <div class="col-md-6">
              <img src="https://www.toyota.astra.co.id/sites/default/files/2021-11/4-avanza-silver-mica-metallic.png" className="img-fluid" alt="..." />
              <div class="table-responsive">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <th>
                        <h6 className="display-6">{kendaraan.nama}</h6>
                      </th>
                    </tr>
                    <tr>
                      <th>Jenis</th>
                      <td>: {kendaraan.jenis}</td>
                    </tr>
                    <tr>
                      <th>Kepemilikan</th>
                      <td>: {kendaraan.kepemilikan}</td>
                    </tr>
                    <tr>
                      <th>BBM</th>
                      <td>: {kendaraan.bbm}L</td>
                    </tr>
                    <tr>
                      <th>Jadwal</th>
                      <td>: {kendaraan.jadwal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="col-md-6">
              <ResponsiveContainer width="95%" height={500}>
                <BarChart
                  width={150}
                  height={40}
                  data={dataGrafik}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nama" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar barSize={50} dataKey="Pemesanans.length" fill="#8884d8" name="Jumlah Pemakaian" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailKendaraan;
