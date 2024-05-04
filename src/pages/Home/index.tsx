import { useEffect, useState } from "react";
import { apiService } from "../../services/api";
import { IUsuario } from "../../interfaces/IUsuario";
import { ModalManagementUser } from "../../components/ModalManagementUser";
import { TableUsers } from "../../components/TableUsers";
import { TheHeader } from "../../components/TheHeader";
import { Notification } from "../../components/Notification";
import { IContentNotification } from "../../interfaces/IContentNotification";

export function Home() {
  const [userList, setUserList] = useState<IUsuario[]>([]);
  const [nameSearchFilter, setNameSearchFilter] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userSelectedToEdit, setUserSelectedToEdit] =
    useState<Partial<IUsuario>>();
  const [contentNotification, setContentNotification] =
    useState<IContentNotification>();

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setUserSelectedToEdit(undefined);
  };

  const handleChangeSearchFilter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setNameSearchFilter(value.toLowerCase());
  };

  const handleRemoveUser = (userId: string) => {
    setUserList((users) => users.filter((user) => user.id !== userId));
    setContentNotification({
      type: "success",
      content: "Usuario removido com sucesso!",
    });
  };

  const handleOpenModalEditUser = (user: IUsuario) => {
    setIsOpenModal(true);
    setUserSelectedToEdit(user);
  };

  useEffect(() => {
    apiService
      .getAllUsers()
      .then((data) => {
        setUserList(data);
      })
      .catch((erro) => {
        console.log(erro);
        setContentNotification({
          type: "error",
          content:
            "Não foi possivel carregar lista de usuarios do banco de dados",
        });
      });
  }, []);

  return (
    <>
      <TheHeader
        onSearchNameByFilter={handleChangeSearchFilter}
        isAllowedActionUsers={
          userList.find((user) => user.id === localStorage.getItem("user_id"))
            ?.tipoUsuario === "Administrador"
        }
        userInfo={userList.find(
          (user) => user.id === localStorage.getItem("user_id")
        )}
        onOpenRegisterModal={() => setIsOpenModal(true)}
      />

      <TableUsers
        nameSearchFilter={nameSearchFilter}
        userList={userList}
        isAllowedActionUsers={
          userList.find((user) => user.id === localStorage.getItem("user_id"))
            ?.tipoUsuario === "Administrador"
        }
        onEditUser={handleOpenModalEditUser}
        onRemoveUser={handleRemoveUser}
      />

      {isOpenModal && (
        <ModalManagementUser
          isOpen={isOpenModal}
          onClose={handleCloseModal}
          initialValues={userSelectedToEdit}
          setUserList={setUserList}
        />
      )}

      {contentNotification && (
        <Notification
          isOpen={Boolean(contentNotification)}
          message={contentNotification?.content}
          onClose={() => setContentNotification(undefined)}
          type={contentNotification.type}
        />
      )}
    </>
  );
}
