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
import { useState } from "react";
import { Notification } from "../Notification";
import { styleModal } from "./styled";

interface IModalManagementUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalManagementUser({
  isOpen,
  onClose,
}: IModalManagementUserProps) {
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const { register, handleSubmit, resetField } = useForm<IUsuario>();

  const onSubmit = (data: IUsuario) => {
    console.log(data);
    resetField("ativo");
    resetField("tipoUsuario");
    resetField("email");
    resetField("nome");
    resetField("senha");
    resetField("sobrenome");
    setIsOpenNotification(true);

    onClose();
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastro de usuario
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

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "end",
              }}
            >
              <Button color="inherit" type="reset" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="text" type="submit">
                Cadastrar
              </Button>
            </div>
          </Box>
        </form>
      </Modal>

      <Notification
        isOpen={isOpenNotification}
        message="Usuario cadastrado com sucesso!"
        type="success"
        onClose={() => setIsOpenNotification(false)}
      />
    </>
  );
}
