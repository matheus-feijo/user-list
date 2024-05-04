import { AccountCircle, SearchOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { IUsuario } from "../../interfaces/IUsuario";

interface ITheHeaderProps {
  onSearchNameByFilter: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  userInfo: IUsuario | undefined;
  onOpenRegisterModal: () => void;
  isAllowedActionUsers: boolean;
}

export function TheHeader({
  onSearchNameByFilter,
  userInfo,
  onOpenRegisterModal,
  isAllowedActionUsers,
}: ITheHeaderProps) {
  const navigate = useNavigate();

  const handleGoOutApp = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

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
                onChange={onSearchNameByFilter}
              />
            </Box>

            <div className={styles["container-data-user"]}>
              <div>
                <AccountCircle fontSize="large" />
              </div>

              <div>
                <Typography variant="body2" color={"rgba(0,0,0,0.6)"}>
                  {userInfo?.nome}
                </Typography>
                <Typography variant="subtitle2" color={"rgba(0,0,0,0.6)"}>
                  {userInfo?.tipoUsuario}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["container-header-bottom"]}>
          <Typography>Usuarios</Typography>
          <div className={styles["container-button-header"]}>
            <Button
              variant="contained"
              onClick={onOpenRegisterModal}
              disabled={!isAllowedActionUsers}
            >
              Cadastrar
            </Button>
            <Button variant="contained" color="error" onClick={handleGoOutApp}>
              Sair
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
