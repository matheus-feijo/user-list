import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IUsuario } from "../../interfaces/IUsuario";
import { useEffect, useState } from "react";
import { Notification } from "../Notification";
import { styleModal } from "./styled";
import styles from "./style.module.css";
import { IContentNotification } from "../../interfaces/IContentNotification";

interface IModalManagementUserProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<IUsuario>;
  setUserList: React.Dispatch<React.SetStateAction<IUsuario[]>>;
}

export function ModalManagementUser({
  isOpen,
  onClose,
  initialValues,
  setUserList,
}: IModalManagementUserProps) {
  const isEdit = Boolean(initialValues);
  const [contentNotification, setContentNotification] =
    useState<IContentNotification>();
  const { register, handleSubmit, setValue, unregister } = useForm<IUsuario>();

  const onSubmit = (data: IUsuario) => {
    console.log(data);
    // resetField("ativo");
    // resetField("tipoUsuario");
    // resetField("email");
    // resetField("nome");
    // resetField("senha");
    // resetField("sobrenome");

    if (isEdit) {
      if (!initialValues?.id) return;

      const userEdited = { ...data, id: initialValues.id };

      setUserList((users) =>
        users.map((user) => {
          if (user.id === initialValues?.id) return userEdited;

          return user;
        })
      );
    } else {
      const newUser = { ...data, id: Math.random() };
      setUserList((users) => [...users, newUser]);
    }

    setContentNotification({
      type: "success",
      content: `Usuario ${isEdit ? "cadastrado" : "atualizado"} com sucesso!`,
    });
    unregister();
    onClose();
  };

  useEffect(() => {
    if (isEdit) {
      setValue("ativo", initialValues?.ativo || false);
      setValue("tipoUsuario", initialValues?.tipoUsuario || "Usuário padrão");
      setValue("email", initialValues?.email || "");
      setValue("nome", initialValues?.nome || "");
      setValue("sobrenome", initialValues?.sobrenome || "");
      setValue("senha", initialValues?.senha || "");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styleModal}>
            <Typography variant="h6" component="h2">
              {`${isEdit ? "Edição" : "Cadastro"} de usuário`}
            </Typography>

            <FormControlLabel
              control={<Switch {...register("ativo")} />}
              label="Usuario ativo"
            />

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Tipo de usuario
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Administrador"
                  control={<Radio {...register("tipoUsuario")} />}
                  label="Administrador"
                />
                <FormControlLabel
                  value="Usuario Padrão"
                  control={<Radio {...register("tipoUsuario")} />}
                  label="Usuario Padrão"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              variant="standard"
              label="Nome"
              required
              {...register("nome")}
            />
            <TextField
              variant="standard"
              label="Sobrenome"
              required
              {...register("sobrenome")}
            />
            <TextField
              variant="standard"
              label="Email"
              required
              {...register("email")}
            />
            <TextField
              variant="standard"
              label="Senha"
              required
              {...register("senha")}
            />

            <div className={styles["container-button"]}>
              <Button color="inherit" type="reset" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="text" type="submit">
                {isEdit ? "Atualizar" : "Cadastrar"}
              </Button>
            </div>
          </Box>
        </form>
      </Modal>

      {contentNotification && (
        <Notification
          isOpen={Boolean(contentNotification)}
          message={contentNotification.content}
          type={contentNotification.type}
          onClose={() => setContentNotification(undefined)}
        />
      )}
    </>
  );
}
