import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faDashboard, faCar, faCarSide, faTableList, faSignOut } from "@fortawesome/free-solid-svg-icons";

const MySidebar = ({ current }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginAdmin");
  };

  return (
    <Sidebar breakPoint="sm" backgroundColor="rgba(235, 232, 232)">
      <Menu>
        <MenuItem>
          <div className="brand">
            <h5>PT. Tambang Freeport</h5>
          </div>
        </MenuItem>
        <MenuItem component={<Link to="/" />} active={current == "Dashboard" ? true : false} icon={<FontAwesomeIcon icon={faDashboard} />}>
          Dashboard
        </MenuItem>
        <SubMenu defaultOpen icon={<FontAwesomeIcon icon={faCar} />} label="Kendaraan">
          <MenuItem component={<Link to="/listKendaraan" />} active={current == "List Kendaraan" ? true : false} icon={<FontAwesomeIcon icon={faTableList} />}>
            List Kendaraan
          </MenuItem>
          <MenuItem component={<Link to="/peminjamanKendaraan" />} active={current == "Peminjaman" ? true : false} icon={<FontAwesomeIcon icon={faCarSide} />}>
            Peminjaman
          </MenuItem>
        </SubMenu>
        <MenuItem onClick={handleLogout} icon={<FontAwesomeIcon icon={faSignOut} />}>
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
