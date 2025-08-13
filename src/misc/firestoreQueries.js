/* eslint-disable no-undef */
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// different discussions lists
const globalDiscussions = collection(db, "discussions/global/discussionList");
// const ictDiscussions = collection(db, "discussions/ict/discussionList");
// const businessDiscussions = collection(
//   db,
//   "discussions/business/discussionList"
// );
// const artDiscussions = collection(db, "discussions/arts/discussionList");
// const postgradDiscussions = collection(
//   db,
//   "discussions/postgraduate/discussionList"
// );

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

export async function toggleLikeComment(
  prevState,
  discussionId,
  uid,
  commentIndex
) {
  return new Promise((resolve, reject) => {
    const docRef = doc(globalDiscussions, discussionId);

    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          let newArray = data.comments;

          if (prevState) {
            newArray[commentIndex].likes = newArray[commentIndex].likes.filter(
              (val) => val !== uid
            );
          } else {
            // Push the UID of the user who liked
            newArray[commentIndex].likes.push(uid);
          }

          updateDoc(docRef, { comments: newArray })
            .then(() => {
              console.log("Successfully updated");
              resolve(newArray[commentIndex].likes.length);
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
        reject(error);
      });
  });
}

export async function toggleLikeReply(
  prevState,
  discussionId,
  uid,
  commentIndex,
  replyIndex
) {
  return new Promise((resolve, reject) => {
    const docRef = doc(globalDiscussions, discussionId);

    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data();
          let newArray = data.comments;

          if (prevState) {
            newArray[commentIndex].replies[replyIndex].likes = newArray[
              commentIndex
            ].replies[replyIndex].likes.filter((val) => val !== uid);
          } else {
            // Push UID of user into likes array inside replies
            newArray[commentIndex].replies[replyIndex].likes.push(uid);
          }

          updateDoc(docRef, { comments: newArray })
            .then(() => {
              console.log("Successfully updated");
              resolve(newArray[commentIndex].replies[replyIndex].likes.length);
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
        reject(error);
      });
  });
}

export async function deleteDiscussion(discussionId) {
  const discussionRef = doc(globalDiscussions, discussionId);
  const discussionSnap = await getDoc(discussionRef);

  if (!discussionSnap.exists()) {
    throw new Error(`Discussion with id: ${discussionId} does not exist!`);
  }

  const response = await deleteDoc(discussionRef);
  return response;
}
