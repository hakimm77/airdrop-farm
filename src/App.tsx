import { Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    let ethereum: any = (window as any).ethereum;

    if (typeof ethereum !== "undefined") {
      const accountsList = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accountsList);
      setAccounts(accountsList);
    } else {
      console.log("Error finding wallet");
    }
  };

  const farmThatShit = async () => {
    await getAccounts();

    await axios
      .post("http://localhost:4000/farm", {
        accounts: accounts,
      })
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getMoney = () => {
    let ethereum: any = (window as any).ethereum;
    if (typeof ethereum !== "undefined") {
      ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[1],
              to: accounts[0],
              value: 4.9,
              gasLimit: "0x5028",
              maxPriorityFeePerGas: "0x3b9aca00",
              maxFeePerGas: "0x2540be400",
            },
          ],
        })
        .then((txHash: any) => console.log(txHash))
        .catch((error: any) => console.error(error));
    }
  };

  useEffect(() => {
    if (started) {
      farmThatShit();
    }
  }, [started]);

  return (
    <Flex
      flexDir="column"
      width="100%"
      height="100vh"
      bgColor="#000"
      color="#fff"
      alignItems="center"
      pt={200}
    >
      <Text fontSize="45px" fontWeight="bold" mb={10}>
        Grow some $MONEY TREES 🌳
      </Text>

      <Button
        width="350px"
        height="50px"
        fontSize="35px"
        onClick={getAccounts}
        mb={5}
      >
        Get Account list
      </Button>
      <Button
        mb={5}
        width="350px"
        height="50px"
        fontSize="35px"
        isDisabled={accounts.length === 0}
        onClick={() => {
          setStarted(!started);
        }}
      >
        {started ? "Farming..." : "FARM $TENET"}
      </Button>

      <Button
        width="350px"
        height="50px"
        fontSize="35px"
        isDisabled={accounts.length === 0}
        onClick={getMoney}
      >
        Get funds
      </Button>
    </Flex>
  );
}

export default App;
