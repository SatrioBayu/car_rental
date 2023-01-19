import MySidebar from "../components/MySidebar";
import styles from "../assets/css/Button.module.css";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const ListKendaraan = () => {
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
    <div class="main">
      <MySidebar current="List Kendaraan" />
      <div class="container my-4">
        <button className={`btn ${styles["toggle"]}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h3 className="text-center">List Kendaraan Perusahaan</h3>
        <div class="row my-3 row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">{kendaraan && kendaraan.map((ken) => <Card key={ken.id} data={ken} />)}</div>
      </div>
    </div>
  );
};

export default ListKendaraan;
