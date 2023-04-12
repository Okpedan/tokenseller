import React, { useState, useEffect } from "react";
import { useWallet } from "use-wallet2";
import { useBlockchainContext, BlockchainProvider } from "../context/index";


import { Toast } from "../utils/message";
import logo from "../assets/images/logo.png";


import audit from "../assets/audit.pdf";
import whitepaper from "../assets/whitepaper.pdf"

export default function Main () {
  const wallet = useWallet();
  const [state, { BuyToken, getTotal }] = useBlockchainContext();
  var styledAddress = wallet.account
    ? wallet.account.slice(0, 6) + "..." + wallet.account.slice(-6)
    : "";
  const [flag, setFlag] = useState(1);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [restTime, setRestTime] = useState(null);

  useEffect(() => {
    if (!state.terms)
      setRestTime({
        day: 0,
        hour: 0,
        min: 0,
        sec: 0,
      });
    else {
      setRestTime({
        day: Math.floor(state.terms.duration / (24 * 3600)),
        hour: Math.floor(
          (state.terms.duration -
            Math.floor(state.terms.duration / (24 * 3600)) * 3600 * 24) /
            3600
        ),
        min: Math.floor(
          (state.terms.duration -
            Math.floor(state.terms.duration / 3600) * 3600) /
            60
        ),
        sec: Math.floor(
          state.terms.duration -
            (Math.floor(state.terms.duration / 3600) * 3600 +
              Math.floor(
                Math.floor(
                  (state.terms.duration -
                    Math.floor(state.terms.duration / 3600) * 3600) /
                    60
                ) * 60
              ))
        ),
      });
    }
  }, [state.terms]);

  useEffect(() => {
    if (amount > 0) {
      Number(flag) === 1
        ? setTokenAmount((amount * state.BNBPrice) / state.price)
        : setTokenAmount(amount / state.price);
    } else {
      setTokenAmount(0);
    }
  }, [flag, amount]);

  useEffect(() => {
    if (state.totalSold !== null) {
      setPercent(
        Number((state.totalSold / state.totalAmount) * 100).toFixed(2)
      );
    } else {
      setPercent(0);
    }
  }, [state.totalSold]);

  const handleConnect = () => {
    wallet.connect();
  };

  const handleBuy = () => {
    if (amount.toString().trim() === "" || amount <= 0) {
      Toast("Please input amount", "warning");
      return;
    }
    if (Number(wallet.chainId) !== state.supportChainId) {
      Toast("Please use Smart Chain", "warning");
      return;
    }
    setLoading(true);
    BuyToken({
      flag: flag,
      amount: amount,
    })
      .then((res) => {
        if (res) {
          Toast("Successfully Buy", "success");
          getTotal();
        } else {
          Toast("Buy Failed", "error");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast("Buy Failed", "error");
      });
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const addToken = async () => {
    if (wallet.status !== "connected") {
      Toast("Please connect wallet", "warning");
      return;
    }

    let tokenAddress = "0xb3b094A30D16e73a3BA6DBE2ef05e73fd71A6dEb";
    let tokenSymbol = "LAMT";
    let tokenDecimals = 18;
    let tokenImage =
      "http://laminatrade.com/wp-content/uploads/2023/04/logo.png";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
      Toast("Failed token add", "error");
    }
  };

  return (
    <>
      <div className="dashboard">
        {/* Begin Header */}
        <div className="container">
          <a href="https://ico.laminatrade.com">
            <div className="header">
              <img src={logo} alt="" />
              <h3>Lamina Token</h3>
            </div>
          </a>
        </div>
        {/* End Header */}

        {/* Begin Mainboard */}

        <div className="container">
          <div className="flex center middle text-center">
            <h3>WORLD'S FIRST AI ON-CHAIN ANALYTICS PROTOCOL</h3>
          </div>

          {/* Begin Presale Card */}
          <div className="card">
            <div className="presale__panel">
              <div className="row">
                <div className="col-sm-4 col-xs-12 text-nowrap">
                  <span>
                    {wallet.status === "connected" ? (
                      <b>{styledAddress}</b>
                    ) : (
                      ""
                    )}
                  </span>
                </div>

              </div>
              <p>Buy Now!! Price Increases in the Next Round</p>
              <h4>{state.terms ? state.terms.status : "Presale start in"}</h4>

              <div className="row time">
                <div className="col-3">
                  <span>
                    {restTime === null
                      ? null
                      : restTime.day > 9
                      ? restTime.day
                      : "0" + restTime.day}
                  </span>
                </div>
                <div className="col-3">
                  <span>
                    {restTime === null
                      ? null
                      : restTime.hour > 9
                      ? restTime.hour
                      : "0" + restTime.hour}
                  </span>
                </div>
                <div className="col-3">
                  <span>
                    {restTime === null
                      ? null
                      : restTime.min > 9
                      ? restTime.min
                      : "0" + restTime.min}
                  </span>
                </div>
                <div className="col-3">
                  <span>
                    {restTime === null
                      ? null
                      : restTime.sec > 9
                      ? restTime.sec
                      : "0" + restTime.sec}
                  </span>
                </div>
              </div>
              <div className="spacer-half"></div>

              <div className="presale__content">
                <div className="row">
                  <div className="col-sm-4 col-xs-12">
                    <span>Symbol: LAMT</span>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <span>Price: {state.price}</span>
                  </div>
                  <div className="col-sm-4 col-xs-12">
                    <span onClick={addToken}>
                      <b>Add to Metamask</b>
                    </span>
                  </div>
                </div>
                <div className="spacer-10"></div>

                <div className="slider">
                  <span>
                    Sold Amount ({Number(state.totalSold).toFixed(2)} $)
                  </span>
                  <div className="bar">
                    <div style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="spacer-10"></div>
                  <div className="status_bar">
                    <div>
                      <span>softcap (500K $)</span>
                    </div>
                    <div>
                      <span>hardcap (900K $)</span>
                    </div>
                  </div>
                  <div className="spacer-double"></div>

                  <div className="presale__control">
                    <label>Select: </label>
                    <select onChange={(e) => setFlag(e.target.value)}>
                      <option value={1}>BNB</option>
                      {/* <option value={2}>BUSD</option> */}
                    </select>
                  </div>
                  <br />
                  <div className="presale__control">
                    <label>Amount: </label>
                    <input type="number" onChange={(e) => onChangeAmount(e)} />
                  </div>
                  <br />
                  {wallet.status === "connected" ? (
                    <div className="presale__control">
                      <label>Token Amount:</label>
                      <span className="color">
                        {state.price === null || state.BNBPrice === null
                          ? "waiting..."
                          : tokenAmount}
                      </span>
                    </div>
                  ) : null}
                  <div className="spacer-single"></div>

                  <div className="flex middle center">
                    {wallet.status === "connecting" ? (
                      <button className="button-white">Connecting...</button>
                    ) : wallet.status === "connected" ? (
                      loading ? (
                        <button className="button-white">Buying...</button>
                      ) : (
                        <button className="button-white" onClick={handleBuy}>
                          Buy LAMT Now
                        </button>
                      )
                    ) : (
                      <button className="button-white" onClick={handleConnect}>
                        Connect Wallet
                      </button>
                    )}
                  </div>

                  <div className="spacer-double"></div>

                  <div className="row">
                    <div className="col-md-6">
                      <a
                        href={audit}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                        
                          className="button-white"
                          style={{
                            backgroundColor: "rgb(46,16,92)",
                            color: "white",
                            border: "2px solid #4CAF50",
                          }}
                        >
                          Audit{" "}
                        </button>
                      </a>
                    </div>
                    <div className="col-md-6">
                      <a
                        href={whitepaper}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                        
                          className="button-white"
                          style={{
                            backgroundColor: "rgb(46,16,92)",
                            color: "white",
                            border: "2px solid #4CAF50",
                          }}
                        >
                          Whitepaper{" "}
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="spacer-half"></div>
                </div>
              </div>
            </div>
          </div>

          {/* End Presale Card */}
        </div>
        <div className="spacer-double"></div>

        <div className="spacer-double"></div>
        
    
      </div>
    </>
  );
};


