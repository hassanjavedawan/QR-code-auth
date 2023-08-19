/** @format */
"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import apis from "./apis/auth";
import QRCode from "react-qr-code";
import { useCookies } from "react-cookie";
import Router from "next/router";
// THIS IS LOGIN PAGE

const initPusher = () => {
  Pusher.logToConsole = false;
  return new Pusher("968e6f33b863f2a28156", {
    cluster: "ap1",
    channelAuthorization: {
      endpoint: apis.AUTHORIZE_PUSHER.url,
    },
  });
};

export default function Login() {
  const [qr_data, setQrData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getQRCode = async () => {
    try {
      let res = await axios.get(apis.GENERATE_QR.url);
      setQrData(res.data.data);
      return res.data.data;
    } catch (e) {
      alert("Cannot fetch QR Data");
    }
    return null;
  };

  const handleLogin = async data => {
    const token = data.token;
    const user_id = data.user_id;
    try {
      let res = await axios.post(apis.VERIFY_TOKEN.url, { token, user_id });
      await Router.replace("/");
      return res.data.data;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const showQrCode = () => {
    let pusher = initPusher();
    getQRCode().then(res => {
      setLoading(false);
      if (res) {
        const channel = pusher.subscribe("private-" + res.channel);
        console.log("CHANNEL=", res.channel);
        channel.bind("login-event", function (data) {
          handleLogin(data);
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    showQrCode();
    setInterval(() => {
      showQrCode();
    }, 10000);
  }, []);
  if (isLoading)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  return (
    <div>
      <main className="flex justify-center items-center flex-col h-screen">
        <div>Please Scan Login Authenticate</div>
        <div style={{ marginTop: 50, background: "white", padding: "16px" ,width:"400px"}} className="flex justify-center">
          {qr_data ? <QRCode value={qr_data.channel} size={320} /> : null}
        </div>
      </main>
    </div>
  );
}
