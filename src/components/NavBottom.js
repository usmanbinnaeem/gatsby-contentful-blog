import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import FacebookIcon from "@material-ui/icons/Facebook"
import GitHubIcon from "@material-ui/icons/GitHub"
import EmailIcon from "@material-ui/icons/Email"
import TwitterIcon from "@material-ui/icons/Twitter"

import "./NavBottom.module.css"

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#333",
    color : "#fff"
  },
})

export default function LabelBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState("recents")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="navbottom" style = {{backgroundColor: "#333", padding : "1rem"}}>
    
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="twitter"
          value="twitter"
          href="https://twitter.com/usmanbinnaeem"
          icon={<TwitterIcon />}
        />
        <BottomNavigationAction
          label="usmaanbinnaeem@gmail.com"
          value="email"
          icon={<EmailIcon />}
        />
        <BottomNavigationAction
          label="github"
          value="github"
          icon={<GitHubIcon />}
          href="https://github.com/usmanbinnaeem"
        />
        <BottomNavigationAction
          label="facebook"
          value="facebook"
          href="https://web.facebook.com/usmantanoli.naeem.1"
          icon={<FacebookIcon />}
        />
        
      </BottomNavigation>
      <h5 >
       © {new Date().getFullYear()}, Tech Curve Guide
      </h5>
     
    </div>
  )
}
