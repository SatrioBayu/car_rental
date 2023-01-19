import MySidebar from "../components/MySidebar";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../assets/css/Button.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { toggleSidebar } = useProSidebar();
  const [kendaraan, setKendaraan] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const coba = await (await axios.get("http://localhost:8000/vehicles")).data;
        setKendaraan(coba.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="main">
      <MySidebar current="Dashboard" />
      <div className="container my-4 justify-content-center">
        <button className={`btn ${styles["toggle"]}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h3 className="text-center">Grafik Pemakaian Kendaraan</h3>
        {kendaraan && (
          <ResponsiveContainer width="95%" height={500}>
            <BarChart
              width={150}
              height={40}
              data={kendaraan}
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
