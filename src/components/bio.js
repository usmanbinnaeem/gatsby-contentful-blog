import React from "react"
import styles from "./bio.module.css"

const Bio = ({ author, skill, bio, profile }) => {
  return (
    <div className={styles.containerr}>
      <div className={styles.bio}>
        <span>article written by </span> <br />
        <strong>{author}</strong>
        <br />
        <div>
          <img className={styles.image} src={profile} alt="" />
        </div>
        <strong>Bio :</strong>
        <span>{bio}</span>
        <div>
          <strong>tags :</strong>

          <span>{skill}</span>
        </div>
      </div>
    </div>
  )
}

export default Bio
