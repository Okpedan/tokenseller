import React from 'react'
import sub1 from "../assets/images/first.png";
import sub2 from "../assets/images/second.png";
import sub3 from "../assets/images/third.png";
import whitepaper from "../assets/whitepaper.pdf";


function Ecosystem() {
  return (
    <div className="ecosystem">
          <h2>Ecosystem</h2>
          <div className="row text-center">
            <div className="col-md-4 col-sm-12">
              <span>
                <img src={sub1} alt="" />
                <h4>Limited Supply Vs Unlimited Demand</h4>
                <p>
                  Lamina Token (LAMT) is a very scarce asset with unlimited
                  demand from trading firms, market makers, traders and market
                  analysts which gives them super power to navigate through the
                  market and make better decisions. Lamina Token (LAMT) is the
                  first native token to power an on-chain protocol which
                  utilizes Artificial Intelligence in solving and organizing the
                  complex data available on-chain, and presenting it in a
                  dashboard that makes the life of every trader much easier by
                  saving them tons of time.
                </p>
              </span>
            </div>
            <div className="col-md-4 col-sm-12">
              <span>
                <img src={sub2} alt="" />
                <h4>Presale Funds For Strategic Partnership & Development:</h4>
                <p>
                  Every BUSD and BNB that arrives to the Lamina Treasury from
                  this Presale will be used in securing high strategic
                  partnership, in the development of the Lamina Protocol and to
                  add liquidity to the LAMT markets in the most strategic way
                  possible. We choose to do it strategically to maximize the
                  gains of the LAMT hodlers and optimize the price discovery
                  mechanism of LAMT and make the price stabilize at the highest
                  possible levels. This is possible thanks to the unhackable
                  unalterable preset parameters of Lamina Protocol which offer
                  the most intelligent on-chain data in human history.
                </p>
              </span>
            </div>
            <div className="col-md-4 col-sm-12">
              <span>
                <img src={sub3} alt="" />
                <h4>
                  Lamina Token (LAMT) is everything a Crypto trader or Crypo
                  Investor will ever want and ask for
                </h4>
                <p>
                  Blockchain is about abundance, not scarcity. Kindly read the{" "}
                  <a href={whitepaper}>
                    Lamina Whitepaper
                  </a>{" "}
                  to understand exactly what we mean and to understand why
                  investing any amount in this Presale will be the most
                  important step you’ll ever make to achieve your natural right
                  of being financially free for the rest of your life. By
                  participating in the presale, you have the opportunity to gain
                  early access to the Lamina Protocol and acquire the most
                  innovative native token at it's lowest prize.
                </p>
              </span>
            </div>
          </div>
        </div>
  )
}

export default Ecosystem