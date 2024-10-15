import { Button, Stack } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getBalance = async (username: string) => {
  const url = `http://localhost:8787/balance/${username}`;

  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, config);

  return response;
};

const Profile = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decoded = jwtDecode<{ username: string }>(accessToken);

      getBalance(decoded.username).then((data) =>
        setBalance(Number(data.data))
      );
    }
  }, []);

  return (
    <Stack
      spacing={4}
      sx={{ maxWidth: 512 }}
      style={{
        alignItems: "center",
      }}
    >
      <h1>У вас {balance} монет на счету</h1>
      <Button size="large" variant="outlined">
        <Link to="/play">Играть</Link>
      </Button>
    </Stack>
  );
};

export default Profile;
