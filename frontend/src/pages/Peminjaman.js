import MySidebar from "../components/MySidebar";
import styles from "../assets/css/Button.module.css";
import { useProSidebar } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import dayjs from "dayjs";
import ModalPinjam from "../components/ModalPinjam";
import ModalKonfirmasi from "../components/ModalKonfirmasi";
import Pagination from "../components/Pagination";
import ModalTolak from "../components/ModalTolak";

const Peminjaman = () => {
  const { toggleSidebar } = useProSidebar();
  const [history, setHistory] = useState("");
  const [exportData, setExportData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [pagination, setPagination] = useState("");

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = history.slice(indexOfFirstPost, indexOfLastPost);
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await (await axios.get("http://localhost:8000/pemesanan")).data;
        setHistory(data.data);
        const coba = data.data.map((d) => {
          return {
            Peminjam: d.namaPeminjam,
            Admin: d.Admin.username,
            Penyetuju: d.Penyetuju.username,
            Kendaraan: d.Kendaraan.nama,
            Tanggal: dayjs(d.createdAt).format("DD MMM YYYY"),
            Status: d.status,
          };
        });
        setPagination(Math.ceil(data.data.length / 5));
        setExportData(coba);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div class="main">
      <MySidebar current="Peminjaman" />
      <div class="container my-4">
        <button className={`btn ${styles["toggle"]}`} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h3 className="text-center">Peminjaman Kendaraan Perusahaan</h3>
        <button class="btn btn-success mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Tambah Peminjaman
        </button>

        {history && (
          <div class="table-responsive mb-3">
            <CSVLink class="btn btn-success my-3" data={exportData} filename="History Peminjaman">
              Export Data
            </CSVLink>
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Peminjam
                  </th>
                  <th scope="col" className="text-center">
                    Admin
                  </th>
                  <th scope="col" className="text-center">
                    Penyetuju
                  </th>
                  <th scope="col" className="text-center">
                    Kendaraan
                  </th>
                  <th scope="col" className="text-center">
                    Tanggal Peminjaman
                  </th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th scope="col" className="text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPost.map((his) => (
                  <tr key={his.id}>
                    <td className="text-center">{his.namaPeminjam}</td>
                    <td className="text-center">{his.Admin.username}</td>
                    <td className="text-center">{his.Penyetuju.username}</td>
                    <td className="text-center">{his.Kendaraan.nama}</td>
                    <td className="text-center">{dayjs(his.createdAt).format("DD MMM YYYY")}</td>
                    <td className="text-center">{his.status}</td>
                    <td className="text-center">
                      {his.status == "Diproses" && (
                        <div class="d-flex flex-column gap-2">
                          <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target={`#exampleModal${his.id}`}>
                            Setujui
                          </button>
                          <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModalTolak${his.id}`}>
                            Tolak
                          </button>
                          <ModalKonfirmasi data={his} />
                          <ModalTolak data={his} />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pages={pagination} page={currentPage} changePage={changePage} />
          </div>
        )}
      </div>
      <ModalPinjam />
    </div>
  );
};

export default Peminjaman;
