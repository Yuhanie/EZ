import { Button, TextField } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function TestEmail() {
  const [email, setEmail] = useState<string>();
  const [response, setResponse] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/email_test',
        data: {
          email: "email",
          // subject: subject,
          // message: message,
        },
      });
      setResponse(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponse(error.message);
      } else {
        setResponse("錯誤");
      }

    }

  }

  return (
    <div>
      <Head>
        <title>email測試</title>
        <meta name="description" content="email test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TextField
        type="text"
        name="email"
        value={email}
        placeholder="請輸入信箱..."
        onChange={handleChange}
        autoComplete="email"
      />
      {response}

      <Button onClick={handleSubmit}>
        送出
      </Button>
    </div>)
}