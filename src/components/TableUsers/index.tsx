import {
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./style.module.css";
import { useState } from "react";
import { IUsuario } from "../../interfaces/IUsuario";

interface ITableUsersProps {
  userList: IUsuario[];
  nameSearchFilter: string;
  isAllowedActionUsers: boolean;
  onEditUser: (user: IUsuario) => void;
  onRemoveUser: (userId: string) => void;
}

export function TableUsers({
  userList,
  nameSearchFilter,
  isAllowedActionUsers,
  onEditUser,
  onRemoveUser,
}: ITableUsersProps) {
  const userIdLogged = localStorage.getItem("user_id");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userIdSelected, setUserIdSelected] = useState("");

  const handleOpenDeleteUser = (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setUserIdSelected(userId);
  };

  const handleCloseDeleteUser = () => {
    setAnchorEl(null);
    setUserIdSelected("");
  };

  return (
    <div className={styles.container}>
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
                      <Tooltip title="Editar">
                        <Button
                          disabled={!isAllowedActionUsers}
                          onClick={() => onEditUser(user)}
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Mais Ações">
                        <Button
                          onClick={(e) => handleOpenDeleteUser(e, user.id)}
                          disabled={!isAllowedActionUsers}
                        >
                          <MoreVertOutlinedIcon />
                        </Button>
                      </Tooltip>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseDeleteUser}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          disabled={
                            !isAllowedActionUsers ||
                            userIdLogged === userIdSelected
                          }
                          onClick={() => {
                            if (!userIdSelected) return;
                            onRemoveUser(userIdSelected);
                            handleCloseDeleteUser();
                          }}
                        >
                          Excluir
                        </MenuItem>
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
  );
}
