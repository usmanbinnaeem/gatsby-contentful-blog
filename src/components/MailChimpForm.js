import addToMailchimp from "gatsby-plugin-mailchimp"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"
import React from "react"
import styles from "./mailchamp.module.css"

export default class MailChimpForm extends React.Component {
  constructor() {
    super()
    this.state = { email: "", result: {} }
  }

  _handleSubmit = async e => {
    console.log("handle sub")
    e.preventDefault()
    const result = await addToMailchimp(this.state.email)
    console.log("result", result)
    this.setState({ result: result.result })
  }

  handleChange = event => {
    this.setState({ email: event.target.value })
  }
  render() {
    return this.state.result === "success" ? (
      <div>
        <strong style={{ color: "green" }}>
          Hii {this.state.email}, You have Successfully subscribed to Tech Curve
          Guide
        </strong>
        <h3>Join the Newsletter</h3>
        <p>
          Every week, we'll be sending you curated materials handpicked to help
          you learn a new language.{" "}
        </p>
        <span>Plus, you'll be the first to know about our discounts!</span>

        <form onSubmit={this._handleSubmit}>
          <div style={{ margin: "24px", padding: "16px" }}>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              onChange={this.handleChange}
              className={styles.text}
              style={{ margin: "16px" }}
            />
          </div>

          <br />
          <Button
            variant="contained"
            color="primary"
            label="Submit"
            type="submit"
            className={styles.button}
            style={{ margin: "16px", padding: "16px" }}
          >
            <Typography variant="button">Subscribe</Typography>
          </Button>
        </form>
      </div>
    ) : this.state.result === "error" ? (
      <div style={{ color: "red" }}>Error</div>
    ) : (
      <>
        <h3>Join the Newsletter</h3>
        <p>
          Every week, we'll be sending you curated materials handpicked to help
          you learn a new language.{" "}
        </p>
        <span>Plus, you'll be the first to know about our discounts!</span>

        <form onSubmit={this._handleSubmit}>
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            variant="outlined"
            onChange={this.handleChange}
            className={styles.text}
            style={{ margin: "16px" }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            label="Submit"
            type="submit"
            className={styles.button}
            style={{ margin: "16px", padding: "16px" }}
          >
            <Typography variant="button">Subscribe</Typography>
          </Button>
        </form>
      </>
    )
  }
}
