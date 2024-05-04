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
} from "@mui/material";
import Paper from "@mui/material/Paper";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./style.module.css";
import { useState } from "react";
import { IUsuario } from "../../../../interfaces/IUsuario";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenDeleteUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeleteUser = () => {
    setAnchorEl(null);
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
                      <Button
                        disabled={!isAllowedActionUsers}
                        onClick={() => onEditUser(user)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={handleOpenDeleteUser}
                        disabled={!isAllowedActionUsers}
                      >
                        <MoreVertOutlinedIcon />
                      </Button>

                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseDeleteUser}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            onRemoveUser(user.id);
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
