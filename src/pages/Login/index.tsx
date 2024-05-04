import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ButtonCSS } from "./styled";
import { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { apiService } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Notification } from "../../components/Notification";

interface ILoginFormValues {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ILoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);

  const { data: userList } = useQuery({
    initialData: [],
    queryKey: ["GET_USER_LIST"],
    queryFn: () => apiService.getAllUsers(),
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = (
    data: ILoginFormValues
  ) => {
    const { email, password } = data;

    const userSelected = userList?.find((user) => user.email === email.trim());

    if (
      !userSelected ||
      userSelected?.senha !== password.trim() ||
      !userSelected.ativo
    ) {
      setIsOpenNotification(true);
      return;
    }
    //Tratando o id como o token da pessoa para poder fazer as requisiçoes necessarias
    localStorage.setItem("user_id", userSelected.id.toString());
    navigate("/home");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
        <TextField
          label="Email"
          variant="standard"
          {...register("email", {
            required: true,
          })}
        />
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            {...register("password", {
              required: true,
            })}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <ButtonCSS variant="contained" type="submit">
          Entrar
        </ButtonCSS>
      </form>

      <Notification
        isOpen={isOpenNotification}
        onClose={() => setIsOpenNotification(false)}
        type="error"
        message="Cadastro não encontrado ou inativo"
      />
    </div>
  );
}
