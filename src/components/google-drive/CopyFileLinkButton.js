import React from "react"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function CopyFileLinkButton({myFile}) {
    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faCopy} />
        <input
          onClick={() => {navigator.clipboard.writeText(myFile.url)}}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
        
      </label>
    );
}