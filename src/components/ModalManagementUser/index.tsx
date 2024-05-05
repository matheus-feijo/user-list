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
import { Controller, useForm } from "react-hook-form";
import { IUsuario } from "../../interfaces/IUsuario";
import { useEffect } from "react";
import { styleModal } from "./styled";
import styles from "./style.module.css";

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
  const { register, handleSubmit, setValue, unregister, control } =
    useForm<IUsuario>();

  const onSubmit = (data: IUsuario) => {
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
      const newUser = { ...data, id: Math.random().toFixed(5) };
      setUserList((users) => [...users, newUser]);
    }

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

            <Controller
              defaultValue={false}
              name="ativo"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={<Switch checked={value} onChange={onChange} />}
                  label="Usuario ativo"
                />
              )}
            />

            <Controller
              defaultValue="Usuário padrão"
              name="tipoUsuario"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel>Tipo de usuario</FormLabel>
                  <RadioGroup onChange={onChange} value={value}>
                    <FormControlLabel
                      value="Administrador"
                      control={<Radio />}
                      label="Administrador"
                    />
                    <FormControlLabel
                      value="Usuário padrão"
                      control={<Radio />}
                      label="Usuário padrão"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />

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
    </>
  );
}
