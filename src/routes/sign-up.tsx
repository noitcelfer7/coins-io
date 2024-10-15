import { Button, FormControl, Stack, TextField } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignUpRequestDto {
  password: string;
  username: string;
}

const signUp = async (signUpRequestDto: SignUpRequestDto) => {
  const url = `http://localhost:8787/auth/sign-up`;

  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(url, signUpRequestDto, config);

  console.log(response);
};

const SignUp = () => {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  return (
    <form
      style={{
        width: 256,
      }}
      onSubmit={(formEvent) => {
        formEvent.preventDefault();

        signUp({ password, username });
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
          Зарегистрироваться
        </Button>
        <Button variant="outlined">
          <Link to="/sign-in">Вход</Link>
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
