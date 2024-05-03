import { Box, Button, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { SearchOutlined, AccountCircle } from "@mui/icons-material";
import styles from "./style.module.css";
import { apiService } from "../../services/api";
import { IUsuario } from "../../interfaces/IUsuario";
import { ModalManagementUser } from "../../components/ModalManagementUser";
import { TableUsers } from "../../components/TableUsers";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem("user_id") || "");
  const [userList, setUserList] = useState<IUsuario[]>([]);
  const [nameSearchFilter, setNameSearchFilter] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => setIsOpenModal(false);

  const handleChangeSearchFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setNameSearchFilter(value.toLowerCase());
  };

  const handleGoOutApp = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  useEffect(() => {
    apiService
      .getAllUsers()
      .then((data) => {
        setUserList(data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles["container-header-top"]}>
          <Typography variant="h5"> Gerenciar Usuarios</Typography>

          <div className={styles["container-search-user"]}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchOutlined sx={{ color: "action.active", mr: 2, my: 0.5 }} />
              <TextField
                variant="standard"
                placeholder="Buscar por usuario"
                onChange={handleChangeSearchFilter}
              />
            </Box>

            <div className={styles["container-data-user"]}>
              <div>
                <AccountCircle fontSize="large" />
              </div>

              <div>
                <Typography variant="body2" color={"rgba(0,0,0,0.6)"}>
                  {userList.find((user) => user.id === userId)?.nome}
                </Typography>
                <Typography variant="subtitle2" color={"rgba(0,0,0,0.6)"}>
                  {userList.find((user) => user.id === userId)?.tipoUsuario}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["container-header-bottom"]}>
          <Typography>Usuarios</Typography>
          <div className={styles["container-button-header"]}>
            <Button variant="contained" onClick={() => setIsOpenModal(true)}>
              Cadastrar
            </Button>
            <Button variant="contained" color="error" onClick={handleGoOutApp}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <TableUsers
        nameSearchFilter={nameSearchFilter}
        userList={userList}
        isAllowedActionUsers={
          userList.find((user) => user.id === userId)?.tipoUsuario ===
          "Administrador"
        }
      />

      <ModalManagementUser isOpen={isOpenModal} onClose={handleCloseModal} />
    </>
  );
}
