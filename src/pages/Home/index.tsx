import {
  Box,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { SearchOutlined, AccountCircle } from "@mui/icons-material";
import styles from "./style.module.css";
import { apiService } from "../../services/api";
import { IUsuario } from "../../interfaces/IUsuario";
import { ModalManagementUser } from "../../components/ModalManagemetUser";

export function Home() {
  const userId = parseInt(localStorage.getItem("user_id") || "");
  const [userList, setUserList] = useState<IUsuario[]>([]);
  const [nameSearchFilter, setNameSearchFilter] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => setIsOpenModal(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSearchFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setNameSearchFilter(value.toLowerCase());
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
          <Button variant="contained" onClick={() => setIsOpenModal(true)}>
            Cadastrar
          </Button>
        </div>
      </header>

      <div className={styles["container-table-users"]}>
        <TableContainer
          component={Paper}
          style={{
            width: "clamp(500px, 75%,1000px)",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell align="center">Tipo Usuario</TableCell>
                <TableCell align="center">Usuario ativo</TableCell>
                <TableCell align="center">Açoes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => {
                if (user.nome.toLowerCase().includes(nameSearchFilter)) {
                  return (
                    <TableRow
                      key={user.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.nome}
                      </TableCell>
                      <TableCell align="center">{user.tipoUsuario}</TableCell>
                      <TableCell align="center">
                        {user.ativo ? "Sim" : "Não"}
                      </TableCell>
                      <TableCell align="center">
                        <Button>
                          <EditIcon />
                        </Button>
                        <Button onClick={handleClick}>
                          <MoreVertOutlinedIcon />
                        </Button>

                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleClose}>Excluir</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                }

                return null;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ModalManagementUser isOpen={isOpenModal} onClose={handleCloseModal} />
    </>
  );
}
