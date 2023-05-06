import { db } from "../../firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

// global discussion list
const globalDiscussions = collection(db, "discussions/global/discussionList");

// Get data of a discussion document from the ID
export async function getDiscussionDetails(discussionId) {
  try {
    const docSnapshot = await getDoc(doc(globalDiscussions, discussionId));

    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      console.log("No document found with provided ID");
      return null;
    }
  } catch (error) {
    console.error("Error getting document", error);
    return null;
  }
}

// async function getDocumentById(id) {
//   try {
//     const docRef = doc(db, "discussions/global/discussionList", id);
//     const

//   } catch (error) {
//     console.error(error);
//   }
// }

// Add or removes the user from the liked list of a post
export async function toggleLikePost(prevState, discussionId, uid) {
  return new Promise((resolve, reject) => {
    const docRef = doc(globalDiscussions, discussionId);

    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          let newArray;

          if (prevState) {
            // Modified array excluding user
            newArray = data.likes.filter((val) => val !== uid);
          } else {
            // Add user into likes array
            newArray = [...data.likes, uid];
          }

          updateDoc(docRef, { likes: newArray })
            .then(() => {
              console.log("Successfully updated");
              resolve(newArray.length); // Resolve the promise with the desired value
            })
            .catch((error) => {
              console.error(error);
              reject(error); // Reject the promise if an error occurs
            });
        } else {
          console.log("Document not found");
          resolve(null); // Resolve the promise with a default value if the document doesn't exist
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject the promise if an error occurs
      });
  });
}

export async function toggleLikeComment() {
  
}
export async function toggleLikeReply() {}
