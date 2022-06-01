import React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function DeleteFileLinkButton({myFile}) {
    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faTrash} />
        <input
          onClick={() => {}}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />

      </label>
    );
}
