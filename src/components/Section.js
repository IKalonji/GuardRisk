import React from 'react'
import './ComponentStyles/Section.css'

const Section = (props) => {
  return (
    <div>
        <br/>
    <section className="section">
  <div className="content">
    <div className="headers">
        <h2>
            Insuring
            <br/>
            Volatility in your
            <br/>
            Crypto Assets
        </h2>
        <br/><br/><br/>
        {props.extraComponetn0}

    </div>

    <div className="img-container">
      <img src="https://appinventiv.com/wp-content/uploads/sites/1/2022/07/What-is-DeFi-Insurance-Identifying-Business-Opportunities-and-Use-Cases_-01-scaled.webp" alt="" className="image"/>
    </div>
  </div>
</section>

    </div>
  )
}

export default Section