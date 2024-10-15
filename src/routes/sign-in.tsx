import { Button, FormControl, Stack, TextField } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SignInRequestDto {
  password: string;
  username: string;
}

const signIn = async (signInRequestDto: SignInRequestDto) => {
  const url = `http://localhost:8787/auth/sign-in`;

  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(url, signInRequestDto, config);

  if (response.status === 200) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  console.log(response);
};

const SignIn = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  return (
    <form
      style={{
        width: 256,
      }}
      onSubmit={(formEvent) => {
        formEvent.preventDefault();

        signIn({ password, username });

        navigate("/profile");
      }}
    >
      <FormControl fullWidth margin="normal">
        <TextField
          label="Имя пользователя"
          size="small"
          value={username}
          onChange={(changeEvent) => {
            setUsername(changeEvent.target.value);
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Пароль"
          size="small"
          type="password"
          value={password}
          onChange={(changeEvent) => {
            setPassword(changeEvent.target.value);
          }}
        />
      </FormControl>
      <Stack spacing={2}>
        <Button variant="contained" type="submit">
          Войти
        </Button>
        <Button variant="outlined">
          <Link to="/sign-up">Регистрация</Link>
        </Button>
      </Stack>
    </form>
  );
};

export default SignIn;
