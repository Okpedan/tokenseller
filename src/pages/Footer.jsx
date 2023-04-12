import React from 'react'
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <section className="footer">
          <a href="https://ico.laminatrade.com">
            <div>
              <img src={logo} alt="" />
              <h3>Lamina Token</h3>
            </div>
          </a>
          <p>Copyright &copy; 2023</p>
        </section>
  )
}

export default Footer