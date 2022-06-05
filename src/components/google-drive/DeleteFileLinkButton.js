import React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { firestore } from "../../firebase";


async function deleteFile(myFile){
  const q = firestore.collection("files").where("userId", "==", myFile.userId).where("url", "==", myFile.url)
    
  await q.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.id)
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      })
    }
  )
}

export default function DeleteFileLinkButton({myFile}) {
    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faTrash} />
        <input
          onClick={()=>{
            deleteFile(myFile)
          }}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />

      </label>
    );
}