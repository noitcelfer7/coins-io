import { useEffect, useRef, useState } from "react";

const Play = () => {
  const [offset, setOffset] = useState<number>(0);

  const [playField, setPlayField] = useState<number[]>([]);

  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    webSocket.current = new WebSocket("ws://localhost:9999");

    webSocket.current.onclose = () => {
      console.log("Соединение разорвано.");
    };

    webSocket.current.onmessage = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);

      if (data.message) {
        switch (data.message) {
          case "PLAY_FIELD": {
            setPlayField(data.playField);
          }
        }
      }
    };

    webSocket.current.onopen = () => {
      console.log("Соединение установлено.");
    };

    return () => {
      if (webSocket.current?.readyState === webSocket.current?.OPEN) {
        webSocket.current?.close();
      }
    };
  }, []);

  const keyDown = (keyboardEvent: KeyboardEvent) => {
    const key = keyboardEvent.key;

    switch (key) {
      case "ArrowLeft": {
        if (offset >= 1000) {
          setOffset((state) => state - 1000);
        }

        break;
      }
      case "ArrowRight": {
        if (offset < 1000000) {
          setOffset((state) => state + 1000);
        }

        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        webSocket.current?.send(
          JSON.stringify({
            event: "REQUEST_CHANGE_QUAD",
            data: {
              accessToken,
              offset,
            },
          })
        );
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  });

  const sendOpenCellRequest = (x: number, y: number) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      webSocket.current?.send(
        JSON.stringify({
          event: "REQUEST_OPEN_CELL",
          data: {
            accessToken,
            x,
            y,
          },
        })
      );
    }
  };

  return (
    <>
      <div>
        {offset}-{offset + 1000}
      </div>
      {playField.map((item, index) => {
        const isCellOpened = Boolean(item & 2);
        const isCellContainsCoin = item & 1;
        return (
          <input
            defaultChecked={!isCellOpened}
            key={`${offset}_${index}_${isCellOpened}_${isCellContainsCoin}`}
            onChange={() => {
              if (!isCellOpened) {
                sendOpenCellRequest(index, Math.floor(offset / 1000));
              }
            }}
            type="checkbox"
            disabled={isCellOpened}
            style={{ backgroundColor: "green" }}
          />
        );
      })}
    </>
  );
};

export default Play;
